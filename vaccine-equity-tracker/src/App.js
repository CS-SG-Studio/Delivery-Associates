import React from 'react';
import './App.css';

import WorldMap from './components/WorldMap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MySlider from './components/MySlider'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


var today = new Date();
var num_months = (today.getFullYear() - 2020) * 12 + (today.getMonth() - 2);

class App extends React.Component { 

  constructor(props){
    super(props);
    this.state = {data: 3, data2: 1, isShown: false, country: "-", sliderVal: num_months * 10 + Math.floor(today.getDate() / 6.2) + 5, buttonState: 0}

    this.showModal = this.showModal.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.sendSliderVal = this.sendSliderVal.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleVaccCallback = this.handleVaccCallback.bind(this);
  }

  handleCallback = (childData) =>{
    this.setState({data: childData})
  }

  handleVaccCallback = (childData) =>{
    this.setState({data2: 1 - this.state.data2})
  }

  searchCountry = (countrySelected) =>{
    this.setState({country: countrySelected, buttonState: 1 - this.state.buttonState})
  }

  sendSliderVal = (val) =>{
    this.setState({sliderVal: val})
  }

  showModal() {
    this.setState({isShown: true})
  }

  render() {
    const data = this.state.data;
      return (
      <div className="App">
        <NavBar showModal={this.showModal} searchCountry={this.searchCountry}/>
        <MySlider sendSliderVal={this.sendSliderVal}/>
        <Modal show={this.state.isShown} onHide={() => {this.setState({isShown: false});}} size="lg" centered>
          <Modal.Header closeButton><Modal.Title>About the Site</Modal.Title></Modal.Header>
          <Modal.Body>
          In this dashboard, we hope to bring attention to the inequitable nature of the distribution of the COVID-19 vaccine. The website gives users the opportunity to visualize the global distribution of COVID-19 vaccines and compare country vaccine access to a number of other variables. The color of each country signifies its current situation - the darker the red, the poorer a country is fairing in terms of vaccination rate, GDP per Capita, life expectancy, or COVID-19 infection rate. By viewing and comparing these various data types, users can get a sense of how these factors correlate with one another. 
          <br/><br/>
          We hope everyone who uses this dashboard, from government officials to citizens of the world, can walk away with a better understanding of the inequities currently surrounding the distribution of the COVID-19 vaccine.

            <br/><hr/>
            <Modal.Title>Instructions</Modal.Title><hr/>
            <Modal.Title>Data Selection</Modal.Title>
            Use the buttons at the bottom of the page to select which data should be displayed on the map. 
<br/><br/>
If the <b>Percent Vaccinated</b> button is selected, the values for this primary datatype will be displayed as shades of red for each country on the map. Then, the site provides the option to select a secondary data type. This data type defaults to <b>None</b>, but the user can also choose between <b>Cases per Million</b>, <b>GDP per Capita</b>, and <b>Life Expectancy</b>. When one of these secondary data types is selected, the data is displayed as bubbles of various sizes for each country. Larger bubbles correspond to higher values.
<br/><br/>
If the <b>Percent Vaccinated</b> button is not selected, one of the secondary data types can be selected to be displayed as a primary data type, appearing as shades of red for each country on the map.
<br/><br/>
            <Modal.Title>The Map</Modal.Title>
            The map displays the data that has been selected in the previous step. To see specific information for each country, simply hover over that country with your mouse.
            <br/><br/>
            <Modal.Title>Search Bar</Modal.Title>
            An additional way to find more information about a specific country is using the search bar. Simply type the name of a country in the bar and press <b>Submit</b>, and that country will be selected and zoomed in on.
            <br/><br/>
            <Modal.Title>Time Slider</Modal.Title>
            Finally, the user has the option to select the time frame for the data to be displayed. This slider defaults to <b>Now</b>, which displays data updated to within the past three weeks, but the user can select any month dating back to March 2020.
            <br/><hr/>
            <Modal.Title>Data Used</Modal.Title>
            All data is taken from <a href="https://ourworldindata.org/">Our World in Data</a> and is updated on a daily basis. Our World in Data provides a unified dataset with data pulled from reputable sources such as the <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins University COVID-19 Data Repository</a> as well as official government reports. Further information about the dataset and its sources can be found on the <a href="https://github.com/owid/covid-19-data/tree/master/public/data">OWID Github</a> or at the <a href="https://ourworldindata.org/coronavirus-source-data">OWID website</a>.
            <br/><br/>
            Along with vaccination data, we selected the following three data types for their strong correlation to Percent Vaccinated as well as for the amount of data available for these data types.
            <br/><hr/>
            <Modal.Title>Percent Vaccinated</Modal.Title>
            The percentage of the population that has recieved at least one dose of a COVID-19 vaccine. This measure is calculated by taking the total number of adults in a given country that have recieved at least one vaccine dose and dividing that number by the population size.
            <br/><br/>
            <Modal.Title>COVID-19 Cases per Million</Modal.Title>
            The number of COVID-19 cases within a given country for every million people. This measure is scaled by population and thus gives us a way to compare the spread of COVID-19 within countries while adjusting for population.
            <br/><br/>
            <Modal.Title>GDP Per Capita</Modal.Title>
            Is equivalent to the Gross Domestic Product (a measure of a country’s economic output) of a country divided by its population. This measure is generally used to gauge the prosperity and standard of living in a given country.
            <br/><br/>
            <Modal.Title>Life Expectancy</Modal.Title>
            Refers to the number of years a person in a given country will live on average.
            <br/>
          </Modal.Body>
          <Modal.Footer><Button variant="danger" onClick={() => {this.setState({isShown: false});}}>Close</Button></Modal.Footer>
        </Modal>
        <WorldMap dataParentToChild = {data} vaccData = {this.state.data2} searchResult = {this.state.country} sliderVal = {this.state.sliderVal} buttonState = {this.state.buttonState}/>
        <Footer parentCallback = {this.handleCallback} parentVaccCallback = {this.handleVaccCallback}/>
      </div>
    );
  }
}

export default App;
