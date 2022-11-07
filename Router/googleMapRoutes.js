const router = require("express").Router();
const trackController= require("../userController/TrackController");




router.get("/ShopData", trackController.ShopData);
module.exports = router;

