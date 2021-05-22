import React, { Component } from 'react';
import './WorldMap.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// Import necessary country data in English
var countries = require("i18n-iso-countries");
// We will need to do this for each individual language we want to support
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Defines colors that are used later in the file
var countryHoverColor = am4core.color("#333333");
var activeCountryColor = am4core.color("#0f0f0f");
var backgroundColor = am4core.color("#ffffff");

const data_fields = ["cases", "gdp", "mortality", "vaccinations"];

// Currently, this will need to be manually updated
const time_convert = {0:"2020-03-20", 10:"2020-04-01", 20:"2020-05-01", 30:"2020-06-01", 40:"2020-07-01", 50:"2020-08-01", 60:"2020-09-01", 70:"2020-10-01", 
                      80:"2020-11-01", 90:"2020-12-01", 100:"2021-01-01", 110:"2021-02-01", 120:"2021-03-01", 130:"2021-04-01", 140:"2021-05-01", 146:"2021-05-21"};

// Display Map is the function that is called when the map is created
// You can see this function call down below in componentDidMount() and componentDidUpdate()
function displayMap(props) {
  function resetHover() {
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isHover = false;
    })
  }
  function showWorld() {
    resetHover();
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isActive = false;
    })
    chart.goHome();
  }

  // Creates container that holds map
  var container = am4core.create("chartdiv", am4core.Container);
  container.width = am4core.percent(100);
  container.height = am4core.percent(100);

  // Creates map
  var chart = container.createChild(am4maps.MapChart);
  chart.height = am4core.percent(100);
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.align = "right";
  chart.zoomControl.valign = "middle";
  chart.geodata = am4geodata_worldLow;
  chart.projection = new am4maps.projections.Miller();
  chart.zoomEasing = am4core.ease.sinOut;
  chart.panBehavior = "move";
  chart.homeGeoPoint = { longitude: 0, latitude: -2 };
  chart.zoomControl.minusButton.events.on("hit", showWorld);
  chart.seriesContainer.background.events.on("hit", showWorld);
  chart.seriesContainer.background.events.on("over", resetHover);

  // Add home button to zoom out
  let button = chart.chartContainer.createChild(am4core.Button);
  button.padding(7, 5, 7, 5);
  button.width = 30;
  button.align = "right";
  button.marginRight = 5;
  button.icon = new am4core.Sprite();
  button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  button.events.on("hit", function() {chart.goHome();});

  // Sets background color
  chart.background.fill = backgroundColor;
  chart.backgroundSeries.mapPolygons.template.polygon.fill = backgroundColor;
  chart.seriesContainer.background.fill = backgroundColor;

  // Sets background color opacity
  chart.background.fillOpacity = 1;
  chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
  chart.seriesContainer.background.fillOpacity = 1;
  
  // Adds countries to map
  let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.exclude = ["AQ"];
  polygonSeries.dataFields.value = data_fields[giveValue()]; // This is how we switch data types (corresponds to dict key)
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;
  //polygonSeries.mapPolygons.template.hoverOnFocus = true; 

  // Pulls data from OWID github and sets it as map data
  chart.dataSource.parser = new am4core.CSVParser();
  chart.dataSource.parser.options.useColumnNames = true;
  chart.dataSource.reloadFrequency = 3600000; // 1 hour in milliseconds (Determines how frequently page will update data)
  chart.dataSource.url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv";
  // When new data is parsed, this code is run
  chart.dataSource.events.on("parseended", function(ev) {
    ev.target.component.series.each(function(polygonSeries) { // polygonSeries holds the data for each country
      var data = ev.target.data;
      var ldata = [];
      for (var i = 0; i < data.length; i++) { 
        var d = data[i];
        // Get data from  date, make sure iso_code is 3 chars (non 3 char iso_codes are usually for continents)
        if (d.date === time_convert[props.sliderVal] && d.iso_code.length === 3) { 
          // Build dictionary and push to list     
          ldata.push({"id"    : countries.alpha3ToAlpha2(d.iso_code),
                      "cases" : d.total_cases_per_million,
                      "vaccinations" : d.people_vaccinated,
                      "mortality" : d.life_expectancy,
                      "gdp" : d.gdp_per_capita});
        }
      }
      // Updates map data
      polygonSeries.data = ldata;
    });
    ev.target.data = [];
  });

  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.stroke = backgroundColor; // Creates outlines for each country
  polygonTemplate.strokeOpacity = 0.15;

  // Settings for info popup when hover over a country
  polygonTemplate.tooltipPosition = "fixed";
  // String that is displayed
  polygonTemplate.tooltipText = "[font-size:24px bold]{name}[font-size:5px]\n\n[font-size:20px bold]{cases}[/] [font-size:14px] Cases per Million[font-size:6px]\n\n[font-size:20px bold]{gdp}[/] [font-size:14px] GDP per Capita[font-size:6px]\n\n[font-size:20px bold]{mortality}[/] [font-size:14px] Year Life Expectancy[font-size:6px]\n\n[font-size:20px bold]{vaccinations}[/] [font-size:14px] Vaccinations Given";

  // Determines country color range
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#ff0000"), //#ff0000
    max: am4core.color("#ffd5d5"), // aec6cf
    logarithmic: true // Added this because it adjust to concentration around the max or min
  });

  // Create Legend for Heat Map
  let heatLegend = chart.createChild(am4charts.HeatLegend);
  heatLegend.series = polygonSeries;
  heatLegend.valign = "bottom";
  heatLegend.align = "center";
  heatLegend.fontWeight = "bold";
  heatLegend.fontSize = 15;
  heatLegend.marginBottom = 10;
  heatLegend.width = am4core.percent(90);

  // Determines what happens when you hover over a country
  var polygonHoverState = polygonTemplate.states.create("hover");
  polygonHoverState.transitionDuration = 700;
  polygonHoverState.properties.fill = countryHoverColor;

  // Determine what is the default state for a country
  var polygonActiveState = polygonTemplate.states.create("active")
  polygonActiveState.properties.fill = activeCountryColor;

  return {chart, polygonSeries};
}

var data_value = 0;

const giveValue = () => {
  return data_value;
}

const getvalue = (val) => {
  data_value = val;
  return val;
}

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.dataParentToChild, country: this.props.searchResult, sliderVal: this.props.sliderVal}
  }

  runSearch(loc) {
    let val = countries.getAlpha2Code(loc, "en");
    if (countries.isValid(val)) {
      this.chart.zoomToMapObject(this.polygonSeries.getPolygonById(val));
    }
  }

  componentDidMount() { 
    let vals = displayMap(this.props);
    this.chart = vals.chart;
    this.polygonSeries = vals.polygonSeries; 
  }
  componentDidUpdate(prevProps) { 
    if (this.props.dataParentToChild !== prevProps.dataParentToChild || this.props.sliderVal !== prevProps.sliderVal) {
      this.setState({data: getvalue(this.props.dataParentToChild), sliderVal: this.props.sliderVal});
      let vals = displayMap(this.props);
      this.chart = vals.chart;
      this.polygonSeries = vals.polygonSeries;
    } 
    if (this.props.searchResult !== prevProps.searchResult) {
      this.runSearch(this.props.searchResult);
    }
  }
  componentWillUnmount() { if (this.chart) { this.chart.dispose(); }  }
  render() {
    return (<div id="chartdiv" style={{width:"100%", height:"89vh"}}></div>);
  }
}
export default WorldMap;
