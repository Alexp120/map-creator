import express from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express();
const port = 3000;

// Environment variable for Azure Maps Key
const AZURE_MAPS_KEY = 'my key';

app.use(express.static('./src/map components/map.tsx'));

app.use(cors())

app.get('/api/mapdata', async (req, res) => {
    try {
        const response = await axios.get('https://atlas.microsoft.com/mapDataUrl', {
            params: { 
                'subscription-key': AZURE_MAPS_KEY,
                // other parameters as needed
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching map data');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

