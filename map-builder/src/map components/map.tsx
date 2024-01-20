import { useEffect, useRef, useState } from 'react';
import * as atlas from 'azure-maps-control';

interface MapConfig {
    center: [number, number];
    zoom: number;
    style: string;
    // Add other configurations as needed
}

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapConfig, setMapConfig] = useState<MapConfig | null>(null);

    useEffect(() => {
        // Fetch the map configuration from the backend
        fetch('/api/mapconfig')
            .then(response => response.json())
            .then(data => {
                setMapConfig(data);
            })
            .catch(error => {
                console.error('Error fetching map configuration:', error);
            });
    }, []);

    useEffect(() => {
        if (mapRef.current && mapConfig) {
            // Initialize the map with the configuration from the backend
            const map = new atlas.Map(mapRef.current, {
                center: mapConfig.center,
                zoom: mapConfig.zoom,
                style: mapConfig.style,
                authOptions: {
                    authType: atlas.AuthenticationType.anonymous,
                    // You can add additional auth options if needed
                },
            });

            // Add additional map controls and logic here as needed
        }
    }, [mapConfig]);

    return <div ref={mapRef} style={{ width: '600px', height: '400px' }}></div>;
};

export default Map;
