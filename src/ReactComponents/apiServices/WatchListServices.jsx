const API_BASE_URL = 'http://localhost:3000'; 

const watchlistService = {

  getWatchlist: async () => {
    try {
      const response = await fetch(`http://localhost:3000/watchlist`);
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      throw error;
    }
  },

  addToWatchlist: async (symbol) => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to watchlist');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      throw error;
    }
  },

  removeFromWatchlist: async (symbol) => {
    try {
      const response = await fetch(`${API_BASE_URL}/watchlist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol }),
      });
      if (!response.ok) {
        throw new Error('Failed to remove from watchlist');
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      throw error;
    }
  },
};

export default watchlistService;