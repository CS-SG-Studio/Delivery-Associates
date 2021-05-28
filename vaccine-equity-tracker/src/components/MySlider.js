import React from 'react';
import './NavBar.css';
import Slider from '@material-ui/core/Slider';
import Box from "@material-ui/core/Box";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{color: "red",},
      track: {color: 'red'},
      rail: {color: 'black'}
    }
}
});
 
// Automatically updates slider based on current date
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var today = new Date();
var d = [{value: 0, label: 'Mar 2020'}]
var num_months = (today.getFullYear() - 2020) * 12 + (today.getMonth() - 2);
for (var i = 0; i < num_months; i++) {
  d.push({"value": (i + 1) * 10, "label": months[((i + 3) % 12)] + " 202" + Math.floor((i + 3) / 12)});
}
d.push({"value": num_months * 10 + Math.floor(today.getDate() / 3.1), "label": "Current"});
  
function valueLabelFormat(value) {
    return "";
}

class MySlider extends React.Component{

  constructor() {
    super();
    this.state = {value : ""}
  }

  render() {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
       <div style={{width: "90%"}}>
       <ThemeProvider theme={muiTheme}>
      <Slider
        defaultValue={num_months * 10 + Math.floor(today.getDate() / 3.1)}
        valueLabelFormat={valueLabelFormat}
        aria-labelledby="discrete-slider-restrict"
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        justify = "center"
        onChangeCommitted = { (e, val) => {this.setState({ value : val }); this.props.sendSliderVal(this.state.value); console.log(num_months * 10 + Math.floor(today.getDate() / 3.1));}} 
        marks={d}
        step={null}
        min={0}
        max={num_months * 10 + Math.floor(today.getDate() / 3.1)}
      />
      </ThemeProvider>
      </div>
      </Box>
    );
  }
}

export default MySlider;