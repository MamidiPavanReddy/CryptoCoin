import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Button, TextField } from '@mui/material';
import CoinCard from './CoinCard.jsx';
import watchlistService from './apiServices/WatchListServices.jsx';

const Watchlist = () => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWatchlist = async () => {
    try {
      const data = await watchlistService.getWatchlist();

      const updatedCoins = data.map(coin => ({
        ...coin,
        image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`, 
      }));

      setWatchlistCoins(updatedCoins);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch watchlist:', err);
      setError('Failed to fetch watchlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!symbol) return;
    try {
      await watchlistService.addToWatchlist(symbol);
      setSymbol('');
      fetchWatchlist();
    } catch (err) {
      console.error('Failed to add item:', err);
      setError('Failed to add item. Please try again.');
    }
  };

  const handleRemove = async (symbol) => {
    try {
      await watchlistService.removeFromWatchlist(symbol);
      fetchWatchlist();
    } catch (err) {
      console.error('Failed to remove item:', err);
      setError('Failed to remove item. Please try again.');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <Box 
      component="main"
      sx={{ 
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f8f9fa',
        overflowY: 'auto'
      }}
    >
      <Box sx={{ 
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ width: '100%', p: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center',
              color: '#000000',
              fontWeight: 'bold',
              mb: 4
            }}
          >
            Your Watchlist
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <TextField
              label="Enter Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button variant="contained" onClick={handleAdd}>
              Add to Watchlist
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 1, px: 3, pb: 3 }}>
          {loading ? (
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary',
                mt: 4
              }}
            >
              Loading...
            </Typography>
          ) : error ? (
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: 'error.main',
                mt: 4
              }}
            >
              {error}
            </Typography>
          ) : watchlistCoins.length === 0 ? (
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary',
                mt: 4
              }}
            >
              No coins in your watchlist yet
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {watchlistCoins.map(coin => (
                <Grid item xs={12} sm={6} lg={4} key={coin._id}>
                  <CoinCard coin={coin} onRemove={() => handleRemove(coin.symbol)} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Watchlist;
