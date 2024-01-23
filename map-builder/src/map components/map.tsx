import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import './map.css'





const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (mapRef.current) {
            // Initialize the map with the configuration from the backend
            mapboxgl.accessToken = 'my api key';
            var map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11'
            });

            // Add additional map controls and logic here as needed
        }
    },);

    return <div className='map-container' ref={mapRef}></div>;
};

export default Map;
