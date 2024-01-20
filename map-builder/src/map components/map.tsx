import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as atlas from 'azure-maps-control';
import './map.css';

function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<atlas.Map | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get('http://localhost:3001/mapToken');
                const token = response.data.token;

                if (mapRef.current && !map) {
                    const newMap = new atlas.Map(mapRef.current, {
                        center: [-77.884775, 43.689592],
                        zoom: 5,
                        authOptions: {
                            token: token,
                            getToken: (resolve) => resolve(token)
                        }
                    });
                    setMap(newMap);
                }
            } catch (error) {
                console.error('Error fetching Azure Maps token:', error);
            }
        };

        fetchToken();

        // Cleanup function
        return () => {
            if (map) {
                map.dispose();
            }
        };
    }, [map]);

    return <div ref={mapRef} className="mapContainer"></div>;
}

export default Map;

