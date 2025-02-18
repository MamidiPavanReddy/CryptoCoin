const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors()); 
const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const API_KEY = "35b1d848-42c4-4482-9eb9-7cf1420b3872"; 

app.get("/crypto", async (req, res) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { "X-CMC_PRO_API_KEY": API_KEY },
            params: { limit: 100, convert: "USD" }
        });
       
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
