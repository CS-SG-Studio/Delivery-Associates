import React from 'react';
import './Map.css';
import { VectorMap } from "react-jvectormap"

const mapData = {
  CN: 10,
  IN: 9,
  SA: 5,
  EG: 4,
  SE: 0,
  FI: 0,
  FR: 0,
  US: 2,
};

const handleClick = (e, countryCode) => {
    console.log(countryCode);
  };

function Map() {
  return (
    <div className='map'>
      <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{width: "100%", height: "520px"}}
          onRegionClick={handleClick}
          regionsSelectable={true}
          regionsSelectableOne={true}
          zoomOnScroll={true}
          containerClassName="map"
          regionStyle={{
            initial: {fill: "#e4e4e4"},
            hover: {"fill-opacity": 0.6,},
            selected: {fill: "#add8e6"},
            selectedHover: {fill: "#3d7ab4"}
          }}
          series={{
            regions: [{
                values: mapData,
                scale: ["#e4e4e4", "#ff0000"],
                normalizeFunction: "linear"
              }]
          }}
        />
    </div>
  );
}

export default Map;