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

const data_fields = ["cases", "gdp", "mortality", "--"];

// Allows data for slider to be automatically updated as months pass
var today = new Date();
var d = {};
d[0] = '2020-03-20';
var num_months = (today.getFullYear() - 2020) * 12 + (today.getMonth() - 2);
for (var i = 0; i < num_months; i++) {
  var month = (((i + 3) % 12) + 1)
  d[(i + 1) * 10] = "202" + Math.floor((i + 3) / 12) + "-" + (month <= 9 ? "0" : "") + month + "-01";
}

// Selects Two Days Ago as current data (in case current day's data is late or missing)
var dt = new Date();
dt.setDate(dt.getDate() - 2);
d[num_months * 10 + Math.floor(today.getDate() / 6.2) + 5] = dt.toISOString().substring(0, 10);
const time_convert = d;

// Selects date a month ago
var dtm = new Date();
dtm.setDate(dtm.getDate() - 20);

// Display Map is the function that is called when the map is created
function displayMap(props) {
  function resetHover() {
    polygonSeries.mapPolygons.each(function(polygon) {
      polygon.isHover = false;
    })

    bubbleSeries.mapImages.each(function(image) {
      image.isHover = false;
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
  chart.homeGeoPoint = { longitude: 0, latitude: 18 };
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
  if (props.vaccData === 1) {
    polygonSeries.dataFields.value = "vaccinations";
  } else {
    polygonSeries.dataFields.value = data_fields[props.dataParentToChild]; // This is how we switch data types (corresponds to dict key)
  }
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;
  polygonSeries.mapPolygons.template.hoverOnFocus = true; 

  var bubbleSeries = chart.series.push(new am4maps.MapImageSeries());
  if (props.vaccData === 1) {
    bubbleSeries.dataFields.value = data_fields[props.dataParentToChild];
  } else {
    bubbleSeries.dataFields.value = "---";
  }
  bubbleSeries.dataFields.id = "id";

  // Pulls data from OWID github and sets it as map data
  if (props.vaccData !== 0 || props.dataParentToChild !== 3) {
    chart.dataSource.parser = new am4core.CSVParser();
    chart.dataSource.parser.options.useColumnNames = true;
    chart.dataSource.reloadFrequency = 3600000; // 1 hour in milliseconds (Determines how frequently page will update data)
    chart.dataSource.url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv";
    chart.dataSource.events.on("parseended", function(ev) {
      ev.target.component.series.each(function(polygonSeries) {
        var data = ev.target.data;
        var ldata = [];
        var ddata = {};
        for (var i = data.length - 1; i >= 0; i--) { 
          var d = data[i];
          var reachBack = time_convert[props.sliderVal] === dt.toISOString().substring(0, 10) && d.date > dtm.toISOString().substring(0, 10);
          if (d.iso_code.length === 3 && (d.date === time_convert[props.sliderVal] || reachBack)) {   
            if (!(countries.alpha3ToAlpha2(d.iso_code) in ddata)) {
              ddata[countries.alpha3ToAlpha2(d.iso_code)] = {"id"           : countries.alpha3ToAlpha2(d.iso_code),
                                                            "cases"        : d.total_cases_per_million,
                                                            "vaccinations" : parseInt(d.people_vaccinated)/parseInt(d.population) * 100,
                                                            "mortality"    : d.life_expectancy,
                                                            "gdp"          : d.gdp_per_capita};
            } else if (props.vaccData === 1 && !ddata[countries.alpha3ToAlpha2(d.iso_code)]["vaccinations"] && typeof(d.people_vaccinated) != "undefined" && reachBack) {
                ddata[countries.alpha3ToAlpha2(d.iso_code)]["vaccinations"] = parseInt(d.people_vaccinated)/parseInt(d.population) * 100;
            }
          }
        }
        for (var key in ddata) {
          ldata.push(ddata[key]);
        }
        polygonSeries.data = ldata;
        bubbleSeries.data = ldata;
      });
      ev.target.data = [];
    });
  }

  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.stroke = backgroundColor; // Creates outlines for each country
  polygonTemplate.strokeOpacity = 0.15;

  // Settings for info popup when hover over a country
  polygonTemplate.tooltipPosition = "fixed";
  // String that is displayed
  polygonTemplate.tooltipText = "[font-size:24px bold]{name}[font-size:6px]\n\n[font-size:20px bold]{vaccinations}%[/] [font-size:14px] of Population Vaccinated[font-size:5px]\n\n[font-size:20px bold]{cases}[/] [font-size:14px] Cases per Million[font-size:6px]\n\n[font-size:20px bold]{gdp}[/] [font-size:14px] GDP per Capita[font-size:6px]\n\n[font-size:20px bold]{mortality}[/] [font-size:14px] Year Life Expectancy";

  // Determines country color range
  var minC = am4core.color("#ff0000");
  var maxC = am4core.color("#ffd5d5");
  if (props.vaccData !== 1 && props.dataParentToChild === 0) {
    var temp = minC;
    minC = maxC;
    maxC = temp;
  }
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: minC, //#ff0000
    max: maxC, // aec6cf
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

  // adjust tooltip
  bubbleSeries.tooltip.getStrokeFromObject = true;
  bubbleSeries.tooltip.getFillFromObject = true;
  bubbleSeries.tooltip.background.fillOpacity = 0.6;
  bubbleSeries.mapImages.template.fill = am4core.color("#de0000");
  bubbleSeries.mapImages.template.stroke = am4core.color("#ffffff");

  var imageTemplate = bubbleSeries.mapImages.template;
  imageTemplate.nonScaling = true;
  imageTemplate.strokeOpacity = 0.7;
  imageTemplate.fillOpacity = 0.7;
  if (props.vaccData === 1) {
    if (props.dataParentToChild === 0) {
      imageTemplate.tooltipText = "[bold]{value} Cases per Million[/]";
    } else if (props.dataParentToChild === 1) {
      imageTemplate.tooltipText = "[bold]{value} GDP per Capita[/]";
    } else if (props.dataParentToChild === 2) {
      imageTemplate.tooltipText = "[bold]{value} Year Life Expectancy[/]";
    }
  }
  var imageHoverState = imageTemplate.states.create("hover");
  imageHoverState.properties.fillOpacity = 1;
  imageHoverState.properties.strokeOpacity = 1;

  var circle = imageTemplate.createChild(am4core.Circle);
  circle.applyOnClones = true;

  bubbleSeries.heatRules.push({"target": circle, "property": "radius", "min": 3, "max": 30, "dataField": "value"})
  bubbleSeries.events.on("dataitemsvalidated", function() {
    bubbleSeries.dataItems.each((dataItem) => {
      var mapImage = dataItem.mapImage;
      var circle = mapImage.children.getIndex(0);
      if (mapImage.dataItem.value === 0) {circle.hide(0);}
      else if (circle.isHidden || circle.isHiding) {circle.show();}
    })
  })

  imageTemplate.adapter.add("latitude", function(latitude, target) {
    var polygon = polygonSeries.getPolygonById(target.dataItem.id);
    if (polygon) {
      target.disabled = false;
      return polygon.visualLatitude;
    }
    else {
      target.disabled = true;
    }
    return latitude;
  });

  imageTemplate.adapter.add("longitude", function(longitude, target) {
    var polygon = polygonSeries.getPolygonById(target.dataItem.id);
    if (polygon) {
      target.disabled = false;
      return polygon.visualLongitude;
    }
    else {
      target.disabled = true;
    }
    return longitude;
  });

  return {chart, polygonSeries};
}

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.state = {data: this.props.dataParentToChild, data2: this.props.vaccData, country: this.props.searchResult, sliderVal: this.props.sliderVal, buttonState: this.props.buttonState}
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
    if (this.props.dataParentToChild !== prevProps.dataParentToChild ||
        this.props.vaccData !== prevProps.vaccData || 
        this.props.sliderVal !== prevProps.sliderVal) {
      this.setState({data: this.props.dataParentToChild, sliderVal: this.props.sliderVal, data2: this.props.vaccData});
      let vals = displayMap(this.props);
      this.chart = vals.chart;
      this.polygonSeries = vals.polygonSeries;
    } else {
      this.runSearch(this.props.searchResult);
    }
  }
  componentWillUnmount() { if (this.chart) { this.chart.dispose(); }  }
  render() {
    return (<div id="chartdiv" style={{width:"100%", height:"89vh"}}></div>);
  }
}
export default WorldMap;
