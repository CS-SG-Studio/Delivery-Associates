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
  
let marks = [
    {value: 0, label: 'Mar 2020',},
    {value: 10, label: 'Apr 2020',},
    {value: 20, label: 'May 2020',},
    {value: 30, label: 'Jun 2020',},
    {value: 40, label: 'Jul 2020',},
    {value: 50, label: 'Aug 2020',},
    {value: 60, label: 'Sep 2020',},
    {value: 70, label: 'Oct 2020',},
    {value: 80, label: 'Nov 2020',},
    {value: 90, label: 'Dec 2020',},
    {value: 100, label: 'Jan 2021',},
    {value: 110, label: 'Feb 2021',},
    {value: 120, label: 'Mar 2021',},
    {value: 130, label: 'Apr 2021',},
    {value: 140, label: 'May 2021',},
    {value: 146, label: 'Current',},  // Figure out how to get current date (Should display this)
  ];
  
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
        defaultValue={146}
        valueLabelFormat={valueLabelFormat}
        aria-labelledby="discrete-slider-restrict"
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        justify = "center"
        onChangeCommitted = { (e, val) => {this.setState({ value : val }); this.props.sendSliderVal(this.state.value);}} 
        marks={marks}
        step={null}
        min={0}
        max={146}
      />
      </ThemeProvider>
      </div>
      </Box>
    );
  }
}

export default MySlider;