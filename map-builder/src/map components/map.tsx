import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import './map.css'





const Map: React.FC = () => {
    const [aspectRatio, setAspectRatio] = useState({
      width: 4,
      height: 4
    });
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useRef(null);
    const heightRef = useRef<HTMLInputElement>(null)
    const widthRef = useRef<HTMLInputElement>(null)
  
    // Function to calculate the canvas dimensions
    const calculateCanvasDimensions = () => {
      const maxWidthForWindowHeight = window.innerHeight * (aspectRatio.width / aspectRatio.height);
      const newWidth = Math.min(window.innerWidth, maxWidthForWindowHeight);
      return {
        width: newWidth,
        height: newWidth / (aspectRatio.width / aspectRatio.height)
      };
    };
  
    // Initialize width and height states
    const [canvasDimensions, setCanvasDimensions] = useState(calculateCanvasDimensions());
    const [mapLockState, setMapLockState] = useState(false)
  
    // Update canvas dimensions on window resize
    useEffect(() => {
      const handleResize = () => {
        setCanvasDimensions(calculateCanvasDimensions());
      };
  
       
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array ensures this runs once on mount

    useEffect(() => {

      setCanvasDimensions(calculateCanvasDimensions())
      setTimeout(() => {
        map.current?.resize();
      }, 100);
      
    }, [aspectRatio])
    
    
    useEffect(() => {
        if (!map.current) {
            // Initialize the map with the configuration from the backend
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHAxMjA1NSIsImEiOiJjbHJwbGh5d2UwNzV6Mm5zemRqY3k0aDN3In0.MVYpg9gwiHgTyhHz0XyO2Q';
            map.current = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/alexp12055/clrpp2kpb007q01p2g77k751m',
            dragRotate: false,
            touchZoomRotate: false,
            });

            // Add additional map controls and logic here as needed
            map.current.on('load', function() {
                console.log(map.current.getStyle().layers);
            });
        }
    },);

    useEffect(() => {
      if(map.current){
        if(mapLockState === true){
      map.current.boxZoom.disable();
      map.current.scrollZoom.disable();
      map.current.dragPan.disable();
      map.current.dragRotate.disable();
      map.current.keyboard.disable();
      map.current.doubleClickZoom.disable();
      map.current.touchZoomRotate.disable();
        }else{
          map.current.boxZoom.enable();
          map.current.scrollZoom.enable();
          map.current.dragPan.enable();
          map.current.dragRotate.enable();
          map.current.keyboard.enable();
          map.current.doubleClickZoom.enable();
          map.current.touchZoomRotate.enable();
        }

      }

    }, [mapLockState])
    

    return(
        <>
        <div className='map-container' ref={mapRef} style={{width: `${canvasDimensions.width -40}px`, height: `${canvasDimensions.height -40}px`}} ></div>

        

        <div className='settings-container'>
          
      <div className='sub-container'>
        <h2>select aspect ratio</h2>
        <button>3x4</button>
        <button>4x3</button>
        <button>16x9</button>
        <h3>or</h3>
        <input className='aspectRatio-input' maxLength={2} type="number" placeholder='width' />
        <input className='aspectRatio-input' maxLength={2} type="number" placeholder='height' />
      </div>
      <button className='lock-map-position-button' onClick={() => setMapLockState(!mapLockState)}>
        {mapLockState ? 'Unlock' : 'Lock'}
      </button>

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
