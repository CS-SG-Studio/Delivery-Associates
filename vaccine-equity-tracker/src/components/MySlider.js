import React from 'react';
import Slider from '@material-ui/core/Slider';
import Box from "@material-ui/core/Box";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// Creates color scheme for slider
const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: { color: "red", },
      track: { color: 'red' },
      rail: { color: 'black' }
    }
  }
});

// Automatically updates slider based on current date
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var today = new Date();
var num_months = (today.getFullYear() - 2020) * 12 + (today.getMonth() - 2);

var d = [{ value: 0, label: 'Mar 2020' }]
for (var i = 0; i < num_months; i++) {
  d.push({ "value": (i + 1) * 10, "label": months[((i + 3) % 12)] + " 202" + Math.floor((i + 3) / 12) });
}
d.push({ "value": num_months * 10 + Math.floor(today.getDate() / 6.2) + 5, "label": "Now" });

// Removes pop-up label from slider
function valueLabelFormat(value) {
  return "";
}

class MySlider extends React.Component {
  constructor() {
    super();
    this.state = { value: "" }
  }

  render() {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <div style={{ width: "90%" }}>
          <ThemeProvider theme={muiTheme}>
            <Slider
              defaultValue={num_months * 10 + Math.floor(today.getDate() / 6.2) + 5}
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="auto"
              justify="center"
              onChangeCommitted={(e, val) => { this.setState({ value: val }); this.props.sendSliderVal(this.state.value); }}
              marks={d}
              step={null}
              min={0}
              max={num_months * 10 + Math.floor(today.getDate() / 6.2) + 5}
            />
          </ThemeProvider>
        </div>
      </Box>
    );
  }
}

export default MySlider;