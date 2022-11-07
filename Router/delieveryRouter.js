const router = require("express").Router();
const userController = require("../userController/delievery");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - USER
 *     description: signup
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
 *         description: Thanks, You have successfully signup.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/signup", userController.signup);

/**
 * @swagger
 * /user/ResendOtp:
 *   post:
 *     tags:
 *       - USER
 *     description: ResendOtp
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Thanks, You have successfully ResendOtp.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/ResendOtp", userController.ResendOtp);
/**
 * @swagger
 * /user/verifyOtp:
 *   post:
 *     tags:
 *       - USER
 *     description: verifyOtp
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp required.
 *         in: formData
 *         required: true

 *     responses:
 *       200:
 *         description: Thanks, You have successfully verify Otp.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/verifyOtp", userController.verifyOtp);
/**
 * @swagger
 * /user/forgotPassword:
 *   post:
 *     tags:
 *       - USER
 *     description: forgotPassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *   

 *     responses:
 *       200:
 *         description: Thanks, You have successfully forget Password.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/forgotPassword", userController.forgotPassword);

/**
 * @swagger
 * /user/resetpassword:
 *   post:
 *     tags:
 *       - USER
 *     description: resetpassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: newPassword
 *         description: newPassword required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: otp
 *         description: otp required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have successfully resetPassword.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/resetpassword", userController.resetpassword);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - USER
 *     description: login
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
 *         description: Thanks, You have successfully login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /user/editProfile:
 *   put:
 *     tags:
 *       - USER
 *     description: editProfile
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
 *       - name: phone
 *         description: phone required.
 *         in: formData
 *         required: true
 *       - name: Address
 *         description: Address required.
 *         in: formData
 *         required: true
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: email
 *         description: email required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *
 *
 *
 *     responses:
 *       200:
 *         description: Thanks, You have successfully editProfile.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/editProfile", auth.verifyToken, userController.editProfile);

/**
 * @swagger
 * /user/changepassword:
 *   put:
 *     tags:
 *       - USER
 *     description: changepassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: oldpassword
 *         description: oldpassword required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPassword required.
 *         in: formData
 *         required: true
 *
 *
 *     responses:
 *       200:
 *         description: Thanks, You have changePassword.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/changepassword", auth.verifyToken, userController.changepassword);

/**
 * @swagger
 * /user/viewUserData:
 *   get:
 *     tags:
 *       - USER
 *     description: viewUserData
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

router.get("/viewUserData", auth.verifyToken, userController.viewUserData);


router.get("/list", auth.verifyToken, userController.list);


router.get("/add", auth.verifyToken, userController.add);

module.exports = router;
