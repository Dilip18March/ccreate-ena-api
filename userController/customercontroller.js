const userModel = require("../userModel/user");
const bcryptjs = require("bcryptjs");
const commonfuntion = require("../helper/commonfunction");
const jwt = require("jsonwebtoken");

const response = require("../responsecodes");
const message = require("../responseMessages");
require("dotenv").config();

let otpTime = 5 * 60 * 1000;

function generateotp() {
  let otp = Math.floor(10000 + Math.random() * 9000);
  console.log(otp);
  return otp;
}

module.exports = {
  customersignup: async (req, res) => {
    try {
      console.log("26 ==>", req.body);
      const {
        firstName,
        lastName,
        Address,
        DOB,
        countryCode,
        phone,
        email,
        password,
      } = req.body;
      let customerData = await userModel.findOne({
        $and: [{ email: email, status: "ACTIVE", userType: "USER" }],
      });

      let otp1 = generateotp();

      console.log(customerData);

      if (customerData) {
        return res.send({
          responseCode: response.USERAL_READYEXIST,
          responseMessage: message.USERAL_READYEXIST,
        });
      } else {
        const hashpassword = bcryptjs.hashSync(password);
        console.log("38888888========================>", hashpassword);
        let title = "Otp verifaction";
        let body = `Your otp is ${otp1}`;
        await commonfuntion.sendMail(req.body.email, title, body);
        const doc = {
          firstName: firstName,
          lastName: lastName,
          Address: Address,
          DOB: DOB,
          countryCode: countryCode,
          phone: phone,
          email: email,
          expTime: Date.now() + otpTime,
          password: hashpassword,
          otp: otp1,
        };
        const Data = await userModel(doc).save();
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.customersignup,
          responseResult: Data,
        });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: console.log(error),
      });
    }
  },
  customerlogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const customerData = await userModel.findOne({
          email: email,
          userType: "USER",
        });
        console.log(customerData);

        if (customerData) {
          console.log(customerData);
          const isMatch = await bcryptjs.compare(
            password,
            customerData.password
          );
          console.log(customerData.password);
          console.log(isMatch);
          if (email === customerData.email && isMatch) {
            const token = jwt.sign(
              { userId: customerData._id, email: email },
              "secret",
              { expiresIn: "1d" }
            );
            res.send({
              responseCode: response.SUCCESS,
              responseMessage: message.customerlogin,
              responsResult: customerData,
              token: token,
            });
          } else {
            res.send({
              responseCode: response.PASSWORD_CONFIRMPASSWORD,
              responseMessage: message.PASSWORD_NOT_MATCH,
            });
          }
        } else {
          res.send({
            responseCode: response.EMAIL_NOVALID,
            responseMessage: message.USER_NOT_FOUND,
          });
        }
      } else {
        res.send({
          responseCode: 400,
          responseMessage: "all Field are required",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  // viewCustomerData: async (req, res) => {
  //   try {
  //     let customerData = await userModel.findOne({

  //       _id: req.userId,
  //       userType: "USER",
  //       status: "ACTIVE",
  //     });

  //     if (!customerData) {
  //       return res.send({
  //         responseCode: response.USER_NOT_FOUND,
  //         responseMessage: USER_NOT_FOUND,
  //         responseResult: [],
  //       });

  //     } else {
  //       return res.send({
  //         responseCode: response.SUCCESS,
  //         responseMessage: message.Sucess,
  //         responseResult: [],
  //       });
  //     }
  //   } catch (error) {
  //     return res.send({
  //       responseCode: response.SOMETHING_WRONG,
  //       responseMessage: message.SOMETHING_WRONG,
  //       responseResult: error.message,
  //     });
  //   }
  // },

  customerviewdata: async (req, res) => {
    try {
      let customerData = await userModel.findOne({
        _id: req.customerData,
        userType: "USER",
        status: "ACTIVE",
      });

      if (!customerData) {
        return res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: "user data found",
          responseResult: customerData,
        });
      }
    } catch (error) {
      return res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },
};
