import React, { Component } from 'react';
import './WorldMap.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// Import necessary country data in English
var countries = require("i18n-iso-countries");
// We will need to do this for each individual language we want to support
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Defines colors that are used later in the file
var countryHoverColor = am4core.color("#333333");
var activeCountryColor = am4core.color("#0f0f0f");
var backgroundColor = am4core.color("#ffffff");

// Display Map is the function that is called when the map is created
// You can see this function call down below in componentDidMount() and componentDidUpdate()
function displayMap() {
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
  polygonSeries.dataFields.value = "index"; // This is how we switch data types (corresponds to dict key)
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;

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
        if (d.date === "2021-04-30" && d.iso_code.length === 3) { 
          // Build dictionary and push to list          
          ldata.push({"id"    : countries.alpha3ToAlpha2(d.iso_code),
                      "index" : d.total_cases_per_million,
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
  polygonTemplate.tooltipText = "[font-size:20px bold]{name}: \n[bold]{index}[/] [font-size:14px] Equitable Vaccine Index \n[bold]{mortality}[/] [font-size:14px] Year Life Expectancy\n[bold]{gdp}[/] [font-size:14px] GDP per Capita";
  

  // Code for search bar - Will zoom in on whatever country is in "United States" place
  chart.events.on("ready", function(ev) {
    let val = countries.getAlpha2Code("United States", "en");
    if (countries.isValid(val)) {
      chart.zoomToMapObject(polygonSeries.getPolygonById(val));
    }
  }); 

  // Determines country color range
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#ff0000"), //#ff0000
    max: am4core.color("#fff5f5") // aec6cf
  });

  // Determines what happens when you hover over a country
  var polygonHoverState = polygonTemplate.states.create("hover");
  polygonHoverState.transitionDuration = 700;
  polygonHoverState.properties.fill = countryHoverColor;

  // Determine what is the default state for a country
  var polygonActiveState = polygonTemplate.states.create("active")
  polygonActiveState.properties.fill = activeCountryColor;
  
  return chart;
}

class WorldMap extends Component {
  componentDidMount() { this.chart = displayMap(this.props); }
  componentDidUpdate() { this.chart = displayMap(this.props); }
  componentWillUnmount() { if (this.chart) { this.chart.dispose(); }  }
  render() {
    return (<div id="chartdiv" style={{width:"100%", height:"89vh"}}></div>);
  }
}
export default WorldMap;