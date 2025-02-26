const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const connectDB = require('./database');
const watchlist = require('./WatchList');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

const router = express.Router();

// Fetch watchlist 
router.get('/watchlist', async (req, res) => {
  try {
    const items = await watchlist.getItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist items' });
  }
});

// Add to watchlist 
router.post('/watchlist', async (req, res) => {
  const { symbol, name, id } = req.body; 
  if (!symbol || !name || !id) {
    return res.status(400).json({ error: 'Symbol, Name, and ID are required' });
  }

  try {
    await watchlist.addItem({ symbol, name, id });  
    res.status(201).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to watchlist' });
  }
});

// Remove from watchlist
router.delete('/watchlist', async (req, res) => {
  const { symbol } = req.body;
  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  try {
    const isDeleted = await watchlist.removeItem(symbol);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from watchlist' });
  }
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
