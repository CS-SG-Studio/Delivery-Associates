import React, { Component } from 'react';
import './WorldMap.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

var countries = require("i18n-iso-countries");
var countryHoverColor = am4core.color("#333333");
var activeCountryColor = am4core.color("#0f0f0f");

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

  var container = am4core.create("chartdiv", am4core.Container);
  container.width = am4core.percent(100);
  container.height = am4core.percent(100);

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

  let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.exclude = ["AQ"];
  polygonSeries.dataFields.value = "value"; // This is how we switch data types (corresponds to dict name)
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;

  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.strokeOpacity = 0.15;
  polygonTemplate.tooltipPosition = "fixed";
  polygonTemplate.tooltipText = "[font-size:20px bold]{name}: \n[bold]{value}[/] [font-size:14px] Equitable Vaccine Index \n[bold]{mortality}[/] [font-size:14px] % Mortality Rate\n[bold]{cases}[/] [font-size:14px] % of Global GDP";

  let dataSource = new am4core.DataSource();
  dataSource.parser = new am4core.CSVParser();
  dataSource.parser.options.useColumnNames = true;
  dataSource.reloadFrequency = 3600000; // 1 hour in milliseconds
  dataSource.url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv";
  dataSource.load();
  dataSource.events.on("done", function(ev) {
    var data = ev.target.data;
    var ldata = [];
    for (var i = 0; i < data.length; i++) { 
      if (data[i]["date"] === "2021-04-30" && data[i]["iso_code"].length === 3) {
        ldata.push({"id"    : countries.alpha3ToAlpha2(data[i]["iso_code"]),
                    "value" : data[i]["​​​​total_cases_per_million"]});
      }
    }
    polygonSeries.data = ldata;
  });
  
  // Get input from Search Bar to Zoom into Country
  // chart.zoomToMapObject(polygonSeries.getPolygonById("IN"));
  // let france = polygonSeries.getPolygonById("FR");
  // france.isHover = true;

  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#fff5f5"),
    max: am4core.color("#ff0000")
  });

  var polygonHoverState = polygonTemplate.states.create("hover");
  polygonHoverState.transitionDuration = 700;
  polygonHoverState.properties.fill = countryHoverColor;

  var polygonActiveState = polygonTemplate.states.create("active")
  polygonActiveState.properties.fill = activeCountryColor;
  
  return chart;
}

class WorldMap extends Component {
  componentDidMount() { this.chart = displayMap(this.props); }
  componentDidUpdate() { this.chart = displayMap(this.props); }
  componentWillUnmount() { if (this.chart) { this.chart.dispose(); }  }
  render() {
    return (<div id="chartdiv" style={{ width: "100%", height: "89vh" }}></div>);
  }
}
export default WorldMap;