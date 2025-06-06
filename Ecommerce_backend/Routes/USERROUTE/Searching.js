


let mongoose = require("../../Database/ProductListing.js");

let Searching = async (req, res) => {
  try {
    const { title = "", price = "" } = req.query;

    const filters = [];

    // Add title search if title is provided
    if (title) {
      filters.push({
        title: { $regex: title, $options: "i" },
      });
    }

    // Add price filter if price range is provided like "2000-5000"
    if (price) {
      const [min, max] = price.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filters.push({
          price: { $gte: min, $lte: max },
        });
      }
    }

    // Combine filters (AND logic)
    const query = filters.length > 0 ? { $and: filters } : {};

    const SearchResult = await mongoose.find(query);
    res.status(200).json({ SearchResult });

  } catch (error) {
    console.log("Search Error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = Searching;
