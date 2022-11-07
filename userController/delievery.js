
const userModel = require("../userModel/user");
const bcryptjs = require("bcryptjs");
const commonfuntion = require("../helper/commonfunction");
const jwt = require("jsonwebtoken");
const response = require("../responsecodes");
const message = require("../responseMessages");
require("dotenv").config();
require("../");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

let otpTime = 5 * 60 * 1000;

function generateotp() {
  let otp = Math.floor(10000 + Math.random() * 9000);
  console.log(otp);
  return otp;
}

module.exports = {
  signup: async (req, res) => {
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
      let userData = await userModel.findOne({
        $and: [{ email: email, status: "ACTIVE", userType: "USER" }],
      });

      let otp1 = generateotp();

      console.log(userData);

      if (userData) {
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
        console.log("===============>", doc);

        const Data = await userModel(doc).save();
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.SIGN_UP,
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

  verifyOtp: async (req, res) => {
    try {
      console.log("70 ==>", req.body);
      let userData = await userModel.findOne({
        email: req.body.email,
        status: "ACTIVE",
        userType: "USER",
      });
      if (!userData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
        });
      } else {
        if (userData.otpVeryfication === true) {
          res.send({
            responseCode: response.ALREADY_EXIST,
            responseMessage: message.USER_ALREADY,
            responseReult: [],
          });
        } else {
          console.log("req.body.otp == userData.otp", req.body.otp, userData);
          if (req.body.otp == userData.otp) {
            let curretTime = Date.now();
            if (curretTime <= userData.expTime) {
              console.log("===========>hgd6666hdfg");
              let save = await userModel.findByIdAndUpdate(
                { _id: userData._id },
                { $set: { otpVeryfication: true } },
                { new: true }
              );
              if (save) {
                res.send({
                  responseCode: response.SUCCESS,
                  responseMessage: message.OTP_VERIFY,
                  responseResult: save,
                });
              }
            } else {
              res.send({
                responseCode: response.OTP_EXPIRED,
                responseMessage: message.OTP_EXPIRED,
                responseResult: [],
              });
            }
          } else {
            return res.send({
              responseCode: response.WRONG_OTP,
              responseMessage: message.WRONG_OTP,
              responseResult: [],
            });
          }
        }
      }
    } catch (error) {
      console.log("error:", error);
      res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMesaage: message.SOMETHING_WRONG,
      });
    }
  },

  ResendOtp: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        email: req.body.email,
        status: "ACTIVE",
        userType: "USER",
      });
      if (!userData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMesaage: message.USER_NOT_FOUND,
          responsResult: [],
        });
      } else {
        let opt2 = generateotp();
        expTime = Date.now() + 5 * 60 * 1000;
        let subject = `otp for Resend`;
        let text = `your OTP is : ${opt2}`;
        await commonfuntion.sendMail(req.body.email, subject, text);
        if (userData) {
          let Data = await userModel.findByIdAndUpdate(
            { _id: userData._id },
            { $set: { expTime: expTime, otp: opt2 } },
            { new: true }
          );
          if (Data) {
            res.send({
              responseCode: response.SUCCESS,
              responseMesaage: message.RESEND_OTP,
              responsResult: opt2,
            });
          } else {
            res.send({
              responseCode: response.USERNOMORE3ELSE,
              responseMesaage: message.user,
              responsResult: [],
            });
          }
        } else {
          res.send({
            responseCode: response.USERNOMORE2ELSE,
            responseMesaage: message.user1,
            responsResult: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        $and: [{ email: req.body.email, userType: "USER", status: "ACTIVE" }],
      });
      if (!userData) {
        return res.send({
          resopnseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let opt3 = generateotp();
        expTime = Date.now() + 5 * 60 * 1000;
        let subject = `otp for Resend`;
        let text = `your OTP is : ${opt3}`;
        await commonfuntion.sendMail(req.body.email, subject, text);
        if (userData) {
          let Data = await userModel.findByIdAndUpdate(
            { _id: userData._id },
            { $set: { expTime: expTime, otp: opt3 } },
            { new: true }
          );
          if (Data) {
            res.send({
              responseCode: response.SUCCESS,
              responseMesaage: message.FORGOT_PASSWORD,
              responsResult: opt3,
            });
          } else {
            res.send({
              responseCode: response.USERNOMORE3ELSE,
              responseMesaage: message.user,
              responsResult: [],
            });
          }
        } else {
          res.send({
            responseCode: response.USERNOMORE2ELSE,
            responseMesaage: message.user1,
            responsResult: [],
          });
        }
      }
    } catch (error) {
      return res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },

  resetpassword: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        email: req.body.email,
        userType: "USER",
        status: "ACTIVE",
      });

      if (!userData) {
        return res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        if (req.body.otp == userData.otp) {
          let currentTime = Date.now();
          if (currentTime <= userData.expTime) {
            req.body.password = req.body.newPassword;

            if (
              req.body.newPassword == req.body.password &&
              req.body.otp == userData.otp
            ) {
              req.body.newPassword = bcryptjs.hashSync(req.body.newPassword);

              let userUpdate = await userModel.findByIdAndUpdate(
                { _id: userData._id },
                {
                  $set: {
                    password: req.body.newPassword,
                    otp: userData.otp,
                    otpVeryfication: true,
                  },
                },
                { new: true }
              );
              if (userUpdate) {
                return res.send({
                  responseCode: response.SUCCESS,
                  responseMessage: message.RESET_PASSWORD,
                  responseResult: userUpdate,
                });
              }
            } else {
              return res.send({
                responseCode: response.PASSWORD_CONFIRMPASSWORD,
                responseMessage: message.PASSWORD_NOT_MATCH,
                responseResult: [],
              });
            }
          } else {
            return res.send({
              responseCode: response.OTP_EXPIRED,
              responseMessage: message.OTP_EXPIRED,
              responseResult: [],
            });
          }
        } else {
          return res.send({
            responseCode: response.WRONG_OTP,
            responseMessage: message.WRONG_OTP,
            responseResult: [],
          });
        }
      }
    } catch (error) {
      return res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const userData = await userModel.findOne({
          email: email,
          userType: "USER",
        });
        console.log(userData);

        if (userData) {
          console.log(userData);
          const isMatch = await bcryptjs.compare(password, userData.password);
          console.log(userData.password);
          console.log(isMatch);
          if (email === userData.email && isMatch) {
            const token = jwt.sign(
              { userId: userData._id, email: email },
              "secret",
              { expiresIn: "1d" }
            );
            res.send({
              responseCode: response.SUCCESS,
              responseMessage: message.LOGIN,
              responsResult: userData,
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

  editProfile: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        _id: req.userId,
        userType: "USER",
        status: "ACTIVE",
      });
      if (!userData) {
        return res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let mail = await userModel.findOne({
          email: req.body.email,
          _id: { $ne: userData._id },
        });
        if (mail) {
          return res.send({
            responseCode: response.USERAL_READYEXIST,
            responseMessage: message.USER_ALREADY,
            responseResult: [],
          });
        } else {
          let userProfileUpdate = await userModel.findByIdAndUpdate(
            { _id: userData._id },
            { $set: req.body },
            { new: true }
          );
          return res.send({
            ResponseCode: response.SUCCESS,
            responseMessage: message.EDIT_PROFILE,
            responseResult: userProfileUpdate,
          });
        }
      }
    } catch (error) {
      console.log("304 ==>", error);
      return res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },
  viewUserData: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        _id: req.userId,
        userType: "USER",
        status: "ACTIVE",
      });

      if (!userData) {
        return res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: "user data found",
          responseResult: userData,
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

  changepassword: async (req, res) => {
    try {
      const { password, confirmPassword, oldpassword } = req.body;

      console.log("=======>271", password, confirmPassword, oldpassword);
      let userData = await userModel.findOne({
        _id: req.userId,
        userType: "USER",
      });
      if (!userData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMesaage: message.USER_NOT_FOUND,
        });
      } else {
        const isMatch = await bcryptjs.compareSync(
          oldpassword,
          userData.password
        );
        if (password && confirmPassword) {
          if (password === confirmPassword && isMatch) {
            const salt = await bcryptjs.genSalt(10);
            const newHasPassword = await bcryptjs.hashSync(password, salt);

            const userUpdatePassword = await userModel.findByIdAndUpdate(
              { _id: userData._id },
              { $set: { password: newHasPassword } },
              { new: true }
            );
            res.send({
              responseCode: response.SUCCESS,
              responseMesaage: message.CHANGE_PASSWORD,
              responsResult: userUpdatePassword,
            });
          } else {
            res.send({
              responseCode: response.PASSWORD_CONFIRMPASSWORD,
              responseMesaage: message.CHANGE_PASSWORD,
            });
          }
        } else {
          res.send({
            responseCode: 403,
            responseMesaage: "all fields are requried",
          });
        }
      }
    } catch (error) {
      res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMesaage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },
  list: async (req, res) => {
    try {
      let userData = await userModel.find({
        status: "ACTIVE",
        userType: "USER",
      });
      if (!userData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.list,
          responseResult: userData,
        });
      }
    } catch (error) {
      res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },
  add: async (req, res) => {
    try {
      let userData = await userModel.findOne({
        type: req.body.type,
        type: "Privacy Policy blockchain",
        status: "ACTIVE",
        userType: "USER",
      });

      if (!userData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let userAdd = await userModel.findByIdAndUpdate(
          { _id: userData._id, status: "ACTIVE", userType: "USER" },
          {
            $set: {
              description: req.body.description,
              type: req.body.type,
              title: req.body.title,
            },
          },
          { new: true }
        );
        if (userAdd) {
          return res.send({
            responseCode: response.SUCCESS,
            responseMessage: message.add,
            responseResult: userAdd,
          });
        }
      }
    } catch (error) {
      res.send({
        responseCode: response.SOMETHING_WRONG,
        responseMessage: message.SOMETHING_WRONG,
        responseResult: error.message,
      });
    }
  },
};