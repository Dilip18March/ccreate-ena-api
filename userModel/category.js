const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const categorySchema = mongoose.Schema;

const categoryKey = new categorySchema(
  {
    categoryName: {
      type: String,
    },
    categoryType: {
      type: String,
    },
    categoryStatus: {
      type: String,
      enum: ["ACTIVE", "BLOCK", "DELETE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

categoryKey.plugin(mongoosePaginate);
module.exports = mongoose.model("category", categoryKey);
