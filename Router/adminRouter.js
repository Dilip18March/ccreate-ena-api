const router = require("express").Router();

const adminController = require("../userController/adminController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags:
 *       - Admin
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
 *     responses:
 *       200:
 *         description: Thanks, You have successfully login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/login", adminController.login);

/**
 * @swagger
 * /admin/forgotPassword:
 *   post:
 *     tags:
 *       - Admin
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
 *         description: Thanks, You have successfully forgotPassword.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/forgotPassword", adminController.forgotPassword);

/**
 * @swagger
 * /admin/resetPassword:
 *   post:
 *     tags:
 *       - Admin
 *     description: resetPassword
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
 *
 *     responses:
 *       200:
 *         description: Thanks, You have successfully Reset Password.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.post("/resetPassword", adminController.resetPassword);

/**
 * @swagger
 * /admin/editProfile:
 *   put:
 *     tags:
 *       - Admin
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
 *
 *
 *     responses:
 *       200:
 *         description: Thanks, You have edit Profile.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/editProfile", auth.verifyToken, adminController.editProfile);

/**
 * @swagger
 * /admin/changePassword:
 *   put:
 *     tags:
 *       - Admin
 *     description: changePassword
 *     produces:
 *       - application/json
 *     parameters:
 *
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *
 *       - name: oldpassword
 *         description: oldpassword required.
 *         in: formData
 *         required: true
 *
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirmPasswordrequired.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Thanks, You have changePassword.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/changePassword", auth.verifyToken, adminController.changePassword);

/**
 * @swagger
 * /admin/createSubAdmin:
 *   put:
 *     tags:
 *       - SUBADMIN
 *     description: createSubAdmin
 *     produces:
 *       - application/json
 *     parameters:
 *
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *
 *       - name: Email
 *         description: Email required.
 *         in: formData
 *         required: true
 *
 *       - name: password
 *         description: password required.
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Thanks, You have createSubAdmin.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.put("/createSubAdmin", auth.verifyToken, adminController.createSubAdmin);

/**
 * @swagger
 * /admin/SubAdminLogin:
 *   post:
 *     tags:
 *       - SUBADMIN
 *     description: SubAdminLogin
 *     produces:
 *       - application/json
 *     parameters:
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
 *     responses:
 *       200:
 *         description: Thanks, You have SubAdminLogin login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.post("/SubAdminLogin", auth.verifyToken, adminController.SubAdminLogin);

/**
 * @swagger
 * /category/addCategory:
 *   put:
 *     tags:
 *       - SUBADMIN
 *     description: addCategory
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: categoryName
 *         description: categoryName required.
 *         in: formData
 *         required: true
 *       - name: categoryType
 *         description: categoryType required.
 *         in: formaData
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
 *         description: Thanks, You have addCategory login.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.put("/addCategory", auth.verifyToken, adminController.addCategory);


router.put("/list", auth.verifyToken, adminController.list);


router.get("/add", auth.verifyToken, adminController.add);


router.get("/delete", auth.verifyToken, adminController.delete);


router.get("/block", auth.verifyToken, adminController.block);




module.exports = router;
