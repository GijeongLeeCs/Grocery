const mongoose = require("mongoose");
const scrapePrices = require("./scraper");

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  store: {
    type: String,
    required: true,
    enum: ["Walmart", "Safeway", "Target"], // Restrict to these stores
  },
  date: {
    type: Date,
    default: Date.now, // Track when the data was added
  },
});

// Static method to update prices for all items
grocerySchema.statics.updatePrices = async function () {
  const items = await this.find({});
  for (const item of items) {
    const prices = await scrapePrices(item.name);
    for (const [store, price] of Object.entries(prices)) {
      if (price) {
        await this.findOneAndUpdate(
          { name: item.name, store },
          { price, date: new Date() },
          { upsert: true }
        );
      }
    }
  }
};

module.exports = mongoose.model("Grocery", grocerySchema);