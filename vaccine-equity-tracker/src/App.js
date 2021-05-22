import React from 'react';
import './App.css';

import WorldMap from './components/WorldMap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MySlider from './components/MySlider'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class App extends React.Component { 

  constructor(props){
    super(props);
    this.state = {data: 0, isShown: false, country: "-", sliderVal: 146}

    this.showModal = this.showModal.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
    this.sendSliderVal = this.sendSliderVal.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
  }

  handleCallback = (childData) =>{
    this.setState({data: childData})
  }

  searchCountry = (countrySelected) =>{
    this.setState({country: countrySelected})
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
          <Modal.Header closeButton><Modal.Title>About the Data</Modal.Title></Modal.Header>
          <Modal.Body>
            <Modal.Title>COVID-19 Infection Rate</Modal.Title>
            Thie percentage of the population that have had COVID-19.
            <br/><br/>
            <Modal.Title>GDP Per Capita</Modal.Title>
            This is simply the Gross Domestic Product (a measure of economic wealth) of a country divided by its population.
            <br/><br/>
            <Modal.Title>Life Expectancy</Modal.Title>
            This is simply the average age of an adult in any given country.
            <br/><br/>
            <Modal.Title>Vaccination Rate</Modal.Title>
            The percentage of the population that has recieved at least one dose of a COVID-19 vaccine.
            <br/><hr/>
            All data is taken from <a href="https://ourworldindata.org/">“Our World in Data”</a> and is continuously updated on a daily basis.
            <br/><br/>
            Our color scale helps visualize how a country is faring in each of these  indices by coloring it more red if the vaccination rate/infection rate/life expectancy/GDP Per Capita is on the lower end and more white if the vaccination rate/infection rate/life expectancy/GDP Per Capita is on the higher end. 
            <br/><br/>
            We hope that this visualization can bring to attention the areas of the world that need the most help when it comes to ensuring a healthy and vaccinated population.
          </Modal.Body>
          <Modal.Footer><Button variant="danger" onClick={() => {this.setState({isShown: false});}}>Close</Button></Modal.Footer>
        </Modal>
        <WorldMap dataParentToChild = {data} searchResult = {this.state.country} sliderVal = {this.state.sliderVal}/>
        <Footer parentCallback = {this.handleCallback}/>
      </div>
    );
  }
}

export default App;
