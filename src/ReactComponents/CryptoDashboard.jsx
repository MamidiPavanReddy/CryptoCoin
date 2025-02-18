import { useState, useEffect } from "react";
import { Grid, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import SearchPanel from "./SearchPanel.jsx";
import CoinCard from "./CoinCard.jsx";

function CryptoDashboard() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      try {
        // Call our backend instead of CoinMarketCap API directly
        const response = await axios.get("http://localhost:5000/crypto");
        console.log(response);

        if (response.data && response.data.data) {
          setCoins(response.data.data);
          setFilteredCoins(response.data.data);
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to fetch data. Please try again later.");
        setCoins([]);
        setFilteredCoins([]);
      }
      setLoading(false);
    };

    getCoins();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  if (loading) {
    return <CircularProgress style={{ margin: "20px auto", display: "block" }} />;
  }

  if (error) {
    return (
      <Alert severity="error" style={{ margin: "20px auto", maxWidth: "500px" }}>
        {error}
      </Alert>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px 0" }}>
        Crypto Coin Tracker
      </Typography>
      <SearchPanel onSearch={handleSearch} />
      <Grid container spacing={3}>
        {filteredCoins.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <CoinCard coin={coin} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CryptoDashboard;