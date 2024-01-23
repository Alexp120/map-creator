import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import './map.css'





const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (mapRef.current) {
            // Initialize the map with the configuration from the backend
            mapboxgl.accessToken = 'api key here';
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

    return <div className='map-container' ref={mapRef}></div>;
};

export default Map;
