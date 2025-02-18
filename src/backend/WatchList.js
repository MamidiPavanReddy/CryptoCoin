const mongoose = require('mongoose');


const watchItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

const WatchItem = mongoose.model('WatchItem', watchItemSchema);

module.exports = {

  addItem: async (symbol) => {
    const item = new WatchItem({ symbol });
    await item.save();
    return item;
  },

  removeItem: async (symbol) => {
    const result = await WatchItem.deleteOne({ symbol });
    return result.deletedCount > 0;
  },
  
  getItems: async () => {
    return await WatchItem.find({});
  }
};