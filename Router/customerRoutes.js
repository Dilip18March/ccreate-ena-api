const router = require("express").Router();
const userController = require("../userController/customercontroller");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /customer/customersignup:
 *   post:
 *     tags:
 *       - USER
 *     description: customersignup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: firstName required.
 *         in: formData
 *         required: true
 *       - name: lastName
 *         description: lastName required.
 *         in: formData
 *         required: true
 *       - name: Address
 *         description: Address required.
 *         in: formData
 *         required: true
 *
 *       - name: DOB
 *         description: DOB required.
 *         in: formData
 *         required: true
 *       - name: countryCode
 *         description: countryCode required.
 *         in: formData
 *         required: true
 *
 *       - name: phone
 *         description: phone required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully customersignup.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/customersignup", userController.customersignup);

/**
 * @swagger
 * /customer/customerlogin:
 *   post:
 *     tags:
 *       - USER
 *     description: customerlogin
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *   

 *     responses:
 *       200:
 *         description: Thanks, You have successfully customerlogin.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/customerlogin", userController.customerlogin);

/**
 * @swagger
 * /customer/customerviewdata:
 *   get:
 *     tags:
 *       - USER
 *     description: customerviewdata
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have viewuserData.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.get("/customerviewdata",auth.verifyToken,userController.customerviewdata);

module.exports = router;
