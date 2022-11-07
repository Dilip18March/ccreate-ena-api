const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const categoryModel = require("../userModel/category");
const commonfunction = require("../helper/commonfunction");
const userModel = require("../userModel/user");
const response = require("../responsecodes");
const message = require("../responseMessages");

function generateotp() {
  let otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  return otp;
}
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        let adminData = await userModel.findOne({
          email: email,
          status: "ACTIVE",
          userType: { $in: ["ADMIN", "SUBADMIN"] },
        });
        console.log("========22", adminData);
        if (adminData) {
          const isMatch = await bcryptjs.compareSync(
            password,
            adminData.password
          );
          console.log("=========", adminData.password);

          if (email === adminData.email) {
            if (isMatch == true) {
              const token = jwt.sign(
                { userId: adminData._id, email: email },
                "secret",
                { expiresIn: "1d" }
              );
              res.send({
                responseCode: response.SUCCESS,
                responseMessage: message.LOG_IN,
                responsResult: adminData,
                token: token,
              });
            } else {
              res.send({
                responseCode: response.PASSWORD_CONFIRMPASSWORD,
                responseMessage: message.PASSWORD_INVALID,
                responsResult: [],
              });
            }
          } else {
            res.send({
              responseCode: response.EMAIL_NOVALID,
              responseMessage: message.EMAIL_NOVALID,
              responsResult: [],
            });
          }
        } else {
          res.send({
            responseCode: response.USER_NOT_FOUND,
            responseMessage: message.USER_NOT_FOUND,
            responseResult: [],
          });
        }
      } else {
        res.send({
          responseCode: response.USERAL_READYEXIST,
          responseMessage: message.USER_ALREADY,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  forgotPassword: async (req, res) => {
    try {
      let adminData = await userModel.findOne({
        $and: [{ email: req.body.email, userType: "ADMIN", status: "ACTIVE" }],
      });
      if (!adminData) {
        return res.send({
          resopnseCode: response.EMAIL_NOVALID,
          responseMessage: message.EMAIL_NOVALID,
          responseResult: [],
        });
      } else {
        let opt = generateotp();
        expTime = Date.now() + 5 * 60 * 1000;
        let subject = `otp for Resend`;
        let text = `your OTP is : ${opt}`;
        await commonfunction.sendMail(req.body.email, subject, text);
        if (adminData) {
          let Data = await userModel.findByIdAndUpdate(
            { _id: adminData._id },
            { $set: { expTime: expTime, otp: opt } },
            { new: true }
          );
          if (Data) {
            res.send({
              responseCode: response.SUCCESS,
              responseMesaage: message.FORGOT_PASSWORD,
              responsResult: opt,
            });
          } else {
            res.send({
              responseCode: response.ADMINNOMOR3ELSE,
              responseMesaage: message.ad_min,
              responsResult: [],
            });
          }
        } else {
          res.send({
            responseCode: response.ADMINNOMOR2ELSE,
            responseMesaage: message.adm_in,
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

  resetPassword: async (req, res) => {
    try {
      let adminData = await userModel.findOne({
        email: req.body.email,
        userType: "ADMIN",
        status: "ACTIVE",
      });

      if (!adminData) {
        return res.send({
          responseCode: response.EMAIL_NOVALID,
          responseMessage: message.EMAIL_NOVALID,
          responseResult: [],
        });
      } else {
        if (req.body.otp == adminData.otp) {
          let currentTime = Date.now();
          if (currentTime <= adminData.expTime) {
            req.body.password = req.body.newPassword;

            if (
              req.body.newPassword == req.body.password &&
              req.body.otp == adminData.otp
            ) {
              req.body.newPassword = bcryptjs.hashSync(req.body.newPassword);

              let userUpdate = await userModel.findByIdAndUpdate(
                { _id: adminData._id },
                {
                  $set: {
                    password: req.body.newPassword,
                    otp: adminData.otp,
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

  editProfile: async (req, res) => {
    try {
      let adminData = await userModel.findOne({ _id: req.userId });
      console.log(req.userId);
      if (!adminData) {
        return res.send({
          responseCode: response.EMAIL_NOVALID,
          responseMessage: message.EMAIL_NOVALID,
          responseResult: [],
        });
      } else {
        let adminProfileUpdate = await userModel.findByIdAndUpdate(
          { _id: adminData._id },
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.send({
          ResponseCode: response.SUCCESS,
          responseMessage: message.EDIT_PROFILE,
          responseResult: adminProfileUpdate,
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

  changePassword: async (req, res) => {
    try {
      const { password, confirmPassword, oldpassword } = req.body;

      let adminData = await userModel.findOne({
        _id: req.userId,
        userType: "ADMIN",
      });
      if (!adminData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMesaage: message.USER_NOT_FOUND,
        });
      } else {
        const isMatch = await bcryptjs.compareSync(
          oldpassword,
          adminData.password
        );
        if (password && confirmPassword) {
          if (password === confirmPassword && isMatch) {
            const salt = await bcryptjs.genSalt(10);
            const newHasPassword = await bcryptjs.hashSync(password, salt);

            const userUpdatePassword = await userModel.findByIdAndUpdate(
              { _id: adminData._id },
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
              responseMesaage: message.PASSWORD_NOT_MATCH,
            });
          }
        } else {
          res.send({
            responseCode: 401,
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
      let adminData = await userModel.find({
        status: "ACTIVE",
        userType: "ADMIN",
      });
      if (!adminData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.list,
          responseResult: adminData,
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
      let adminData = await userModel.findOne({
        type: req.body.type,
        type: "Privacy Policy blockchain",
        status: "ACTIVE",
        userType: "ADMIN",
      });

      if (!adminData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let userAdd = await userModel.findByIdAndUpdate(
          { _id: adminData._id, status: "ACTIVE", userType: "ADMIN" },
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

  delete: async (req, res) => {
    try {
      let adminData = await userModel.findOne({ _id: req.body._id });
      if (!adminData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let userdelete = await userModel.findByIdAndDelete(
          { _id: adminData._id },
          { new: true }
        );
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.delete,
          responseResult: userdelete,
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
  block: async (req, res) => {
    try {
      let adminData = await userModel.findOne({ _id: req.query._id });
      if (!adminData) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let userblock = await userModel.findByIdAndUpdate(
          { _id: adminData._id },
          { $set: { status: "BLOCK" } },
          { new: true }
        );
        if (userblock) {
          return res.send({
            responseCode: response.SUCCESS,
            responseMessage: message.block,
            responseResult: userblock,
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
  createSubAdmin: async (req, res) => {
    try {
      const adminData = await userModel.findOne({
        _id: req.userId,
        status: "ACTIVE",
        userType: { $in: ["ADMIN", "SUBADMIN"] },
      });
      //console.log(admin);
      if (!adminData) {
        return res.send({
          responseCode: 401,
          responseMessage: "INCORRECT_JWT",
        });
      } else {
        const query = {
          $and: [
            { $or: [{ email: req.body.email }, { phone: req.body.phone }] },
            { status: { $ne: "DELETE" }, userType: "SUBADMIN" },
          ],
        };
        var subadminData = await userModel.findOne(query);
        //console.log(subadminData);
        if (subadminData == null) {
          // req.body.profilePic = await commonfunction.uploadImage1(
          //   req.body.profilePic
          // );
          //console.log(req.body.profilePic);
          req.body.password = await bcryptjs.hashSync(req.body.password);
          console.log(req.body.password);
          var saveRes = await userModel(req.body).save();
          res.send({
            responseCode: 200,
            responseMessage: "SUB_ADMIN_CREATED",
            responseResult: saveRes,
          });
        } else {
          res.send({
            responseCode: 403,
            responseMessage: "ALREADY_EXIST",
            responseResult: saveRes,
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.send({
        responseCode: 501,
        responseMessage: "Something Wrong",
        responseResult: error,
      });
    }
  },
  SubAdminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        let subadminData = await userModel.findOne({
          email: email,
          status: "ACTIVE",
          userType: { $in: ["ADMIN", "SUBADMIN"] },
        });
        console.log("========22", subadminData);
        if (subadminData) {
          const isMatch = await bcryptjs.compareSync(
            password,
            subadminData.password
          );
          console.log("=========", subadminData.password);

          if (email === subadminData.email) {
            if (isMatch == true) {
              const token = jwt.sign(
                { userId: subadminData._id, email: email },
                "secret",
                { expiresIn: "1d" }
              );
              res.send({
                responseCode: response.SUCCESS,
                responseMessage: message.LO_GIN,
                responsResult: subadminData,
                token: token,
              });
            } else {
              res.send({
                responseCode: response.PASSWORD_CONFIRMPASSWORD,
                responseMessage: message.PASSWORD_INVALID,
                responsResult: [],
              });
            }
          } else {
            res.send({
              responseCode: response.EMAIL_NOVALID,
              responseMessage: message.EMAIL_NOVALID,
              responsResult: [],
            });
          }
        } else {
          res.send({
            responseCode: response.USER_NOT_FOUND,
            responseMessage: message.USER_NOT_FOUND,
            responseResult: [],
          });
        }
      } else {
        res.send({
          responseCode: response.USERAL_READYEXIST,
          responseMessage: message.USER_ALREADY,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  addCategory: async (req, res) => {
    try {
      const adminData = await userModel.findOne({
        _id: req.userId,
        status: "ACTIVE",
        userType: { $in: ["ADMIN", "SUBADMIN"] },
      });
      console.log("==============================", adminData);
      if (!adminData) {
        return res.send({
          responseCode: 401,
          responseMessage: "INCORRECT_JWT",
        });
      } else {
        var categoryData = await categoryModel.findOne({
          categoryName: req.body.categoryName,
          categoryType: req.body.categoryType,
        });
        if (categoryData) {
          res.send({
            responseCode: 403,
            responseMessage: "ALREADY_EXIST",
            responseResult: [],
          });
        } else {
          var SaveRes = await categoryModel(req.body).save();
          res.send({
            responseCode: 200,
            responseMessage: "CATEGORY ADD SUCCESSFULLY",
            responseResult: SaveRes,
          });
        }
      }
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something Wrong",
        responseResult: error,
      });
    }
  },
};
