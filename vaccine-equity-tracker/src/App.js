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
          <Modal.Header closeButton><Modal.Title>About the Index</Modal.Title></Modal.Header>
          <Modal.Body>
          <Modal.Title>Need to Fill this in With Relevant Info about Data and Stuff!!!</Modal.Title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget enim lobortis, bibendum justo vitae, sodales metus. Nam commodo eros augue, eget sodales eros fringilla at. Praesent posuere, nulla blandit pharetra luctus, arcu nisi blandit dolor, at mollis dolor turpis non lorem. Duis porttitor, mi vel fringilla faucibus, diam mi convallis quam, a feugiat elit dui vel erat. 
            <br/><br/>
            Nulla facilisi. Etiam porta nulla eget nisl eleifend, quis placerat ipsum porttitor. Cras semper dignissim nulla, vel lobortis massa varius vel. Morbi non libero augue. In suscipit justo nec blandit pulvinar. Curabitur ultricies, dolor eu rutrum hendrerit, ipsum ipsum ultrices dolor, in aliquet ligula lectus pretium turpis. Integer lacinia posuere sagittis. 
            <br/><br/>
            Curabitur sollicitudin ornare turpis, sed imperdiet odio mattis ut.
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
