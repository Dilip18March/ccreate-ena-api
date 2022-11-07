const googlemapModel = require("../userModel/googlemapModel");
const response = require("../responsecodes")
const message=require("../responseMessages")

module.exports = {
  ShopData: async (req, res) => {
    try {
      let ShopData = await googlemapModel.find({
        _id: req.shopeId,
        userType: "USER",
        status: "ACTIVE",
      });

      if (!ShopData) {
        return res.send({
          responseCode: response.USER_NOT_FOUND,
          responseMessage: message.USER_NOT_FOUND,
          responseResult: [],
        });
      } else {
        return res.send({
          responseCode: response.SUCCESS,
          responseMessage: "user data found",
          responseResult: ShopData,
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
