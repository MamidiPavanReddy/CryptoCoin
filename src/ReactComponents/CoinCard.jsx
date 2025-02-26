import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import watchlistService from './apiServices/WatchListServices.jsx';

function CoinCard({ coin }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const watchlist = await watchlistService.getWatchlist();
        setIsInWatchlist(watchlist.some(item => item.symbol === coin.symbol));
      } catch (err) {
        console.error('Failed to check watchlist:', err);
        setError('Failed to check watchlist status.');
      }
    };

    checkWatchlist();
  }, [coin.symbol]);

  const handleWatchlistToggle = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isInWatchlist) {
        await watchlistService.removeFromWatchlist(coin.symbol);
      } else {
        await watchlistService.addToWatchlist(coin.symbol);
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (err) {
      console.error('Failed to update watchlist:', err);
      setError('Failed to update watchlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ margin: '10px', padding: '10px' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img 
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            alt={coin.name}
            style={{ width: '30px', marginRight: '10px' }}
          />
          <Typography variant="h6">{coin.name} ({coin.symbol})</Typography>
        </div>
        <Typography>Price: ${coin.quote?.USD?.price?.toFixed(2)}</Typography>
        <Typography>24h Change: {coin.quote?.USD?.percent_change_24h?.toFixed(2)}%</Typography>
        <Typography>Market Cap: ${coin.quote?.USD?.market_cap?.toLocaleString()}</Typography>
        {error && (
          <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
        <Button 
          variant="contained"
          onClick={handleWatchlistToggle}
          disabled={loading}
          style={{ marginTop: '10px' }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isInWatchlist ? (
            'Remove from Watchlist'
          ) : (
            'Add to Watchlist'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CoinCard;