import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import './map.css'





const Map: React.FC = () => {
    const aspectRatio = {
      width: 3,
      height: 4
    };
  
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (mapRef.current) {
            // Initialize the map with the configuration from the backend
            mapboxgl.accessToken = 'api key';
            var map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/alexp12055/clrpp2kpb007q01p2g77k751m'
            });

            // Add additional map controls and logic here as needed

            map.on('load', function() {
                console.log(map.getStyle().layers);
            });
        }
    },);

    return(
        <>
        <div className='map-container' ref={mapRef} style={{width: "80vw", height: "99vh"}}></div>

        <div className='settings-container'>
      <div className='sub-container'>
        <h2>select aspect ratio</h2>
        <button>3x4</button>
        <button>4x3</button>
        <button>16x9</button>
        <h3>or</h3>
        <input placeholder='custom' />
      </div>
      <div className='sub-container'>
        <h2>Select Font</h2>
        <select >
          <option defaultChecked >Sans Serif</option>
          <option>placeHolder font</option>
          <option>placeHolder font</option>
        </select>
      </div>
      <div className='sub-container'>
        <h2>Icon selection</h2>
        <select>
          <option value="1" defaultChecked >default</option>
          <option value="1">placeHolder</option>
          <option value="1">placeHolder</option>
          <option value="1">placeHolder</option>
        </select>
      </div>
      <button className='export-button'>Export</button>
    </div>
    </>
    ) 
};

export default Map;
