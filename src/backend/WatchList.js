const mongoose = require('mongoose');

const watchItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },  
  id: { type: String, required: true },    
  dateCreated: { type: Date, default: Date.now }
});

const WatchItem = mongoose.model('WatchItem', watchItemSchema);

module.exports = {

  // add watchlist items
  addItem: async (coin) => {
    const { symbol, name, id } = coin;
    const item = new WatchItem({ symbol, name, id });
    await item.save();
    return item;
  },

  // Remove item by symbol
  removeItem: async (symbol) => {
    const result = await WatchItem.deleteOne({ symbol });
    return result.deletedCount > 0;
  },

  // Get all items in the watchlist
  getItems: async () => {
    return await WatchItem.find({});
  }
};
