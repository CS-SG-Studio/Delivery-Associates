import React, { Component } from 'react';
import './WorldMap.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

var data = [
  { id: "AF", value: 60.524, mortality: 245, cases: 60.524},
  { id: "AL", value: 77.185, mortality: 96, cases: 77.185},
  { id: "DZ", value: 70.874, mortality: 95, cases: 70.874},
  { id: "AO", value: 51.498, mortality: 238, cases: 51.498},
  { id: "AR", value: 76.128, mortality: 120, cases: 76.128},
  { id: "AM", value: 74.469, mortality: 111, cases: 74.469},
  { id: "AU", value: 82.364, mortality: 116, cases: 82.364},
  { id: "AT", value: 80.965, mortality: 61, cases: 80.965},
  { id: "AZ", value: 70.686, mortality: 62, cases: 70.686},
  { id: "BH", value: 76.474, mortality: 118, cases: 76.474},
  { id: "BD", value: 70.258, mortality: 159, cases: 70.258},
  { id: "BY", value: 69.829, mortality: 57, cases: 69.829},
  { id: "BE", value: 80.373, mortality: 130, cases: 80.373},
  { id: "BJ", value: 59.165, mortality: 100, cases: 59.165},
  { id: "BT", value: 67.888, mortality: 161, cases: 67.888},
  { id: "BO", value: 66.969, mortality: 72, cases: 66.969},
  { id: "BA", value: 76.211, mortality: 179, cases: 76.211},
  { id: "BW", value: 47.152, mortality: 242, cases: 47.152},
  { id: "BR", value: 73.667, mortality: 207, cases: 73.667},
  { id: "BN", value: 78.35 , mortality: 182, cases: 78.35 },
  { id: "BG", value: 73.448, mortality: 92, cases: 73.448},
  { id: "BF", value: 55.932, mortality: 249, cases: 55.932},
  { id: "BI", value: 53.637, mortality: 143, cases: 53.637},
  { id: "KH", value: 71.577, mortality: 98, cases: 71.577},
  { id: "CM", value: 54.61 , mortality: 135, cases: 54.61 },
  { id: "CA", value: 81.323, mortality: 255, cases: 81.323},
  { id: "CV", value: 74.771, mortality: 290, cases: 74.771},
  { id: "CF", value: 49.517, mortality: 122, cases: 49.517},
  { id: "TD", value: 50.724, mortality: 170, cases: 50.724},
  { id: "CL", value: 79.691, mortality: 341, cases: 79.691},
  { id: "CN", value: 75.178, mortality: 63, cases: 75.178},
  { id: "CO", value: 73.835, mortality: 412, cases: 73.835},
  { id: "KM", value: 60.661, mortality: 360, cases: 60.661},
  { id: "CD", value: 49.643, mortality: 87, cases: 49.643},
  { id: "CG", value: 58.32 , mortality: 80, cases: 58.32 },
  { id: "CR", value: 79.712, mortality: 137, cases: 79.712},
  { id: "CI", value: 50.367, mortality: 225, cases: 50.367},
  { id: "HR", value: 76.881, mortality: 261, cases: 76.881},
  { id: "CU", value: 79.088, mortality: 97, cases: 79.088},
  { id: "CY", value: 79.674, mortality: 398, cases: 79.674},
  { id: "CZ", value: 77.552, mortality: 88, cases: 77.552},
  { id: "DK", value: 79.251, mortality: 92, cases: 79.251},
  { id: "GL", value: 79.251, mortality: 55, cases: 79.251},
  { id: "DJ", value: 61.319, mortality: 81, cases: 61.319},
  { id: "DO", value: 73.181, mortality: 132, cases: 73.181},
  { id: "EC", value: 76.195, mortality: 256, cases: 76.195},
  { id: "EG", value: 70.933, mortality: 65, cases: 70.933},
  { id: "SV", value: 72.361, mortality: 245, cases: 72.361},
  { id: "GQ", value: 52.562, mortality: 160, cases: 52.562},
  { id: "ER", value: 62.329, mortality: 114, cases: 62.329},
  { id: "EE", value: 74.335, mortality: 165, cases: 74.335},
  { id: "ET", value: 62.983, mortality: 177, cases: 62.983},
  { id: "FJ", value: 69.626, mortality: 305, cases: 69.626},
  { id: "FI", value: 80.362, mortality: 252, cases: 80.362},
  { id: "FR", value: 81.663, mortality: 119, cases: 81.663},
  { id: "GA", value: 63.115, mortality: 393, cases: 63.115},
  { id: "GF", value: 79.9  , mortality: 219, cases: 79.9  },
  { id: "GM", value: 58.59 , mortality: 186, cases: 58.59 },
  { id: "GE", value: 74.162, mortality: 70, cases: 74.162},
  { id: "DE", value: 80.578, mortality: 71, cases: 80.578},
  { id: "GH", value: 60.979, mortality: 221, cases: 60.979},
  { id: "GR", value: 80.593, mortality: 262, cases: 80.593},
  { id: "GT", value: 71.77 , mortality: 160, cases: 71.77 },
  { id: "GN", value: 55.865, mortality: 69, cases: 55.865},
  { id: "GW", value: 54.054, mortality: 241, cases: 54.054},
  { id: "GY", value: 66.134, mortality: 66, cases: 66.134},
  { id: "HT", value: 62.746, mortality: 140, cases: 62.746},
  { id: "HN", value: 73.503, mortality: 162, cases: 73.503},
  { id: "HK", value: 83.199, mortality: 262, cases: 83.199},
  { id: "HU", value: 74.491, mortality: 269, cases: 74.491},
  { id: "IS", value: 81.96 , mortality: 264, cases: 81.96 },
  { id: "IN", value: 66.168, mortality: 243, cases: 66.168},
  { id: "ID", value: 70.624, mortality: 145, cases: 70.624},
  { id: "IR", value: 73.736, mortality: 126, cases: 73.736},
  { id: "IQ", value: 69.181, mortality: 55, cases: 69.181},
  { id: "IE", value: 80.531, mortality: 178, cases: 80.531},
  { id: "IL", value: 81.641, mortality: 176, cases: 81.641},
  { id: "IT", value: 82.235, mortality: 80, cases: 82.235},
  { id: "JM", value: 73.338, mortality: 174, cases: 73.338},
  { id: "JP", value: 83.418, mortality: 62, cases: 83.418},
  { id: "JO", value: 73.7  , mortality: 58, cases: 73.7  },
  { id: "KZ", value: 66.394, mortality: 54, cases: 66.394},
  { id: "KE", value: 61.115, mortality: 131, cases: 61.115},
  { id: "KP", value: 69.701, mortality: 51, cases: 69.701},
  { id: "KR", value: 81.294, mortality: 111, cases: 81.294},
  { id: "KW", value: 74.186, mortality: 181, cases: 74.186},
  { id: "KG", value: 67.37 , mortality: 219, cases: 67.37 },
  { id: "LA", value: 67.865, mortality: 197, cases: 67.865},
  { id: "LV", value: 72.045, mortality: 79, cases: 72.045},
  { id: "LB", value: 79.716, mortality: 162, cases: 79.716},
  { id: "LS", value: 48.947, mortality: 193, cases: 48.947},
  { id: "LR", value: 60.23 , mortality: 154, cases: 60.23 },
  { id: "LY", value: 75.13 , mortality: 96, cases: 75.13 },
  { id: "LT", value: 71.942, mortality: 483, cases: 71.942},
  { id: "LU", value: 80.371, mortality: 230, cases: 80.371},
  { id: "MK", value: 75.041, mortality: 150, cases: 75.041},
  { id: "MG", value: 64.28 , mortality: 155, cases: 64.28 },
  { id: "MW", value: 54.798, mortality: 56, cases: 54.798},
  { id: "MY", value: 74.836, mortality: 216, cases: 74.836},
  { id: "ML", value: 54.622, mortality: 255, cases: 54.622},
  { id: "MR", value: 61.39 , mortality: 123, cases: 61.39 },
  { id: "MU", value: 73.453, mortality: 53, cases: 73.453},
  { id: "MX", value: 77.281, mortality: 270, cases: 77.281},
  { id: "MD", value: 68.779, mortality: 55, cases: 68.779},
  { id: "MN", value: 67.286, mortality: 202, cases: 67.286},
  { id: "ME", value: 74.715, mortality: 145, cases: 74.715},
  { id: "MA", value: 70.714, mortality: 127, cases: 70.714},
  { id: "EH", value: 70.714, mortality: 164, cases: 70.714},
  { id: "MZ", value: 49.91 , mortality: 211, cases: 49.91 },
  { id: "MM", value: 65.009, mortality: 99, cases: 65.009},
  { id: "NA", value: 64.014, mortality: 69, cases: 64.014},
  { id: "NP", value: 67.989, mortality: 336, cases: 67.989},
  { id: "NL", value: 80.906, mortality: 195, cases: 80.906},
  { id: "NZ", value: 80.982, mortality: 296, cases: 80.982},
  { id: "NI", value: 74.515, mortality: 151, cases: 74.515},
  { id: "NE", value: 57.934, mortality: 59, cases: 57.934},
  { id: "NG", value: 52.116, mortality: 66, cases: 52.116},
  { id: "NO", value: 81.367, mortality: 146, cases: 81.367},
  { id: "SJ", value: 81.367, mortality: 250, cases: 81.367},
  { id: "OM", value: 76.287, mortality: 352, cases: 76.287},
  { id: "PK", value: 66.42 , mortality: 55, cases: 66.42 },
  { id: "PA", value: 77.342, mortality: 96, cases: 77.342},
  { id: "PG", value: 62.288, mortality: 159, cases: 62.288},
  { id: "PY", value: 72.181, mortality: 111, cases: 72.181},
  { id: "PE", value: 74.525, mortality: 224, cases: 74.525},
  { id: "PH", value: 68.538, mortality: 146, cases: 68.538},
  { id: "PL", value: 76.239, mortality: 124, cases: 76.239},
  { id: "PT", value: 79.732, mortality: 194, cases: 79.732},
  { id: "QA", value: 78.231, mortality: 111, cases: 78.231},
  { id: "RO", value: 73.718, mortality: 76, cases: 73.718},
  { id: "RU", value: 67.874, mortality: 62, cases: 67.874},
  { id: "RW", value: 63.563, mortality: 61, cases: 63.563},
  { id: "SA", value: 75.264, mortality: 167, cases: 75.264},
  { id: "SN", value: 63.3  , mortality: 96, cases: 63.3  },
  { id: "RS", value: 73.934, mortality: 135, cases: 73.934},
  { id: "SL", value: 45.338, mortality: 203, cases: 45.338},
  { id: "SG", value: 82.155, mortality: 198, cases: 82.155},
  { id: "SK", value: 75.272, mortality: 147, cases: 75.272},
  { id: "SI", value: 79.444, mortality: 169, cases: 79.444},
  { id: "SB", value: 67.465, mortality: 110, cases: 67.465},
  { id: "SO", value: 54    , mortality: 191, cases: 54    },
  { id: "ZA", value: 56.271, mortality: 89, cases: 56.271},
  { id: "SS", value: 54.666, mortality: 185, cases: 54.666},
  { id: "ES", value: 81.958, mortality: 103, cases: 81.958},
  { id: "LK", value: 74.116, mortality: 163, cases: 74.116},
  { id: "SD", value: 61.875, mortality: 389, cases: 61.875},
  { id: "SR", value: 70.794, mortality: 51, cases: 70.794},
  { id: "SZ", value: 48.91 , mortality: 104, cases: 48.91 },
  { id: "SE", value: 81.69 , mortality: 72, cases: 81.69 },
  { id: "CH", value: 82.471, mortality: 146, cases: 82.471},
  { id: "SY", value: 71    , mortality: 316, cases: 71    },
  { id: "TW", value: 79.45 , mortality: 301, cases: 79.45 },
  { id: "TJ", value: 67.118, mortality: 321, cases: 67.118},
  { id: "TZ", value: 60.885, mortality: 56, cases: 60.885},
  { id: "TH", value: 74.225, mortality: 131, cases: 74.225},
  { id: "TL", value: 67.033, mortality: 224, cases: 67.033},
  { id: "TG", value: 56.198, mortality: 180, cases: 56.198},
  { id: "TT", value: 69.761, mortality: 52, cases: 69.761},
  { id: "TN", value: 75.632, mortality: 49, cases: 75.632},
  { id: "TR", value: 74.938, mortality: 301, cases: 74.938},
  { id: "TM", value: 65.299, mortality: 123, cases: 65.299},
  { id: "UG", value: 58.668, mortality: 147, cases: 58.668},
  { id: "UA", value: 68.414, mortality: 150, cases: 68.414},
  { id: "AE", value: 76.671, mortality: 265, cases: 76.671},
  { id: "GB", value: 80.396, mortality: 133, cases: 80.396},
  { id: "US", value: 78.797, mortality: 172, cases: 78.797},
  { id: "UY", value: 77.084, mortality: 91, cases: 77.084},
  { id: "UZ", value: 68.117, mortality: 104, cases: 68.117},
  { id: "VE", value: 74.477, mortality: 191, cases: 74.477},
  { id: "PS", value: 73.018, mortality: 288, cases: 73.018},
  { id: "VN", value: 75.793, mortality: 180, cases: 75.793},
  { id: "YE", value: 62.923, mortality: 74, cases: 62.923},
  { id: "ZM", value: 57.037, mortality: 67, cases: 57.037},
  { id: "ZW", value: 58.142, mortality: 261, cases: 58.142}
];

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
  polygonSeries.dataFields.value2 = "value2";
  polygonSeries.useGeodata = true;
  polygonSeries.calculateVisualCenter = true;

  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.strokeOpacity = 0.15;
  polygonTemplate.tooltipPosition = "fixed";
  polygonTemplate.tooltipText = "[font-size:20px bold]{name}: \n[bold]{value}[/] [font-size:10px] Equitable Vaccine Index \n[bold]{mortality}[/] [font-size:10px] Mortality Rate\n[bold]{cases}[/] [font-size:10px] % of Global GDP";
  
  polygonSeries.data = data;

  // Get input from Search Bar
  // chart.zoomToMapObject(polygonSeries.getPolygonById("IN"));

  // let france = polygonSeries.getPolygonById("FR");
  // france.isHover = true;

  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#ffffff"),
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