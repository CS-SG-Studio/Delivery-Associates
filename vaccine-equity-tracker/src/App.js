import React from 'react';
import './App.css';
import WorldMap from './components/WorldMap'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() { 
  return (
    <div className="App">
      <NavBar/>
      <WorldMap/>
      <Footer/>
    </div>
  );
}

export default App;