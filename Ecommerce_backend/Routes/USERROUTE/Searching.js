


let mongoose = require("../../Database/ProductListing.js");

let Searching = async (req, res) => {
   try { //SearchText is used for both search by title and product id 
    const { SearchText = "", price = "",Role=" " } = req.query;

    const filters = [];

        if (SearchText) {
    if(Role==="Admin"){
    // if role is a admin than we can also search by title and product id and 

          filters.push({
        $or:[
        {
          title: { $regex: SearchText, $options: "i" }},
          {
            ProductId: { $regex: SearchText, $options: "i" } // Search by ProductId
          }

        ]
      });
    }
     else{
  //if role is a user or user is a not login
      filters.push({
          title: { $regex:SearchText, $options:"i" }, //only show thos product  whose value or price is  less or equal to  price
         }
         );
        }
  
  
  }

  

    // Add price filter if price range is provided like "2000-5000"
    if (price) {
        filters.push({
          price: { $lte: price }, //only show thos product  whose value or price is  less or equal to  price
         }
         );
      
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
