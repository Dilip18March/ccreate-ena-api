const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const user = new schema(
  {
    otp: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
    },
    Address: {
      type: String,
    },
    DOB: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    otpVeryfication: {
      type: Boolean,
      default: false,
    },
    expTime: {
      type: Number,
    },
    userType: {
      type: String,
      enum: ["ADMIN", "USER", "SUBADMIN"],
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

const userModel = mongoose.model("user", user);
module.exports = userModel;

userModel.findOne(
  { status: "ACTIVE", userType: "ADMIN" },
  (err, adminResult) => {
    if (err) {
      console.log("Admin creation error:", err);
    } else if (adminResult) {
      console.log("Default admin exist.");
    } else {
      let admin = {
        firstName: "Dilip",
        lastName: "Kumar",
        countryCode: "91",
        phone: "9736783787",
        DOB: "18/03/2002",
        email: "no-dilip@mailinator.com",
        Address: "Sitamarhi,Bihar",
        password: bcryptjs.hashSync("Mobiloitte1"),
        userType: "ADMIN",
      };
      userModel(admin).save((error, adminCreate) => {
        if (error) {
          console.log("Admin creation error:", error);
        } else {
          console.log("Default admin created.", adminCreate);
        }
      });
    }
  }
);
