import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;
app.use(cors());

const tenantId = process.env.AZURE_AD_TENANT_ID;
const clientId = process.env.AZURE_AD_CLIENT_ID;
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;

async function getAzureMapsToken() {
    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('resource', 'https://atlas.microsoft.com/');

    try {
        const response = await axios.post(url, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Azure Maps token:', error);
        throw error;
    }
}

app.get('/mapToken', async (req, res) => {
    try {
        const token = await getAzureMapsToken();
        res.json({ token });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
