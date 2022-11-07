const staticModel = require("../userModel/static");
const response = require("../responsecodes");
const message = require("../responseMessages");

module.exports = {
  view: async (req, res) => {
    try {
      let admin = await staticModel.findOne({ _id: req.query._id });
      if (!admin) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.view,
          responseResult: admin,
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
  list: async (req, res) => {
    try {
      let admin = await staticModel.find({
        status: "ACTIVE",
        userType: "ADMIN",
      });
      if (!admin) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: message.list,
          responseResult: admin,
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
      let admin = await staticModel.findOne({
        type: req.body.type,
        type: "Privacy Policy blockchain",
        status: "ACTIVE",
        userType: "ADMIN",
      });

      if (!admin) {
        res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        let userAdd = await staticModel.findByIdAndUpdate(
          { _id: admin._id, status: "ACTIVE", userType: "ADMIN" },
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
