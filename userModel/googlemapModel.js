const mongoose = require("mongoose");
const shopeschema = mongoose.Schema;


const shop = new shopeschema(
  {
    user_id:{
      type: String,
      required:true,
    
  },
    location: {
      type: {
        type: String,
        required: true,
        coordinates: [78.0421, 27.1751],
      },
    },

    email: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    title: {
      type: String,
    },

    expTime: {
      type: Number,
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

shop.index({location:"2dsphere"})

const googlemapModel = mongoose.model("shop", shop);
module.exports = googlemapModel;
