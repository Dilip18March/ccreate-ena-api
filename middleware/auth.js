const jwt = require("jsonwebtoken");
const userModel = require("../userModel/user");
require("dotenv").config();
module.exports = {
  verifyToken(req, res, next) {
    try {
      if (req.headers.token) {
        jwt.verify(req.headers.token, "secret", (err, result) => {
          if (err) {
            if (err.userId == "TokenExpried") {
              return res.status(500).send({
                responseCode: 500,
                responseMessage: "Internal Server Error",
                responseResult: err.message,
              });
            } else {
              return res.status(440).send({
                responseCode: 440,
                responseMessage: "Unauthroised Person",
              });
            }
          } else {
            userModel.findOne({ _id: result.userId }, (error, result2) => {
              if (error) {
                return next(error);
              } else if (!result2) {
                return res.status(404).json({
                  responseCode: 404,
                  responseMessage: "USER NOT FOUND",
                });
              } else {
                if (result2.status == "BLOCK") {
                  return res.status(403).json({
                    responseCode: 403,
                    responseMessage: "You have been blocked by admin .",
                  });
                } else if (result2.status == "DELETE") {
                  return res.status(402).json({
                    responseCode: 402,
                    responseMessage: "Your account has been deleted by admin .",
                  });
                } else {
                  console.log(
                    "Keys created and next callback called successfully"
                  );
                  req.userId = result2._id;
                  next();
                }
              }
            });
          }
        });
      } else {
        return res.send({
          responseCode: 401,
          responseMessage: "Token  not found.",
        });
      }
    } catch (error) {
      console.log("verifyToken error ==>", error);
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong!",
        responseResult: error,
      });
    }
  },
};
