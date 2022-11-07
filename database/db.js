const mongoose = require("mongoose");

mongoose.connect(
  // "mongodb+srv://dilip:dilip12@cluster0.mnhyu9p.mongodb.net/?retryWrites=true&w=majority",
  "mongodb://127.0.0.1:27017/EnaApps",

  {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log("Error in database connection: ", err);
    } else {
      console.log("Database connected successfully.");
    }
  }
);
