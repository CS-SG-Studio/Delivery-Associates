import React from 'react';
import './App.css';
import WorldMap from './components/WorldMap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

class App extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
        data: 0
    }
  }

  handleCallback = (childData) =>{
    this.setState({data: childData})
  }

  render() {
    const {data} = this.state;
      return (
      <div className="App">
        <NavBar/>
        <WorldMap dataParentToChild = {data}/>
        <Footer parentCallback = {this.handleCallback}/>
      </div>
    );
    }
}

export default App;
