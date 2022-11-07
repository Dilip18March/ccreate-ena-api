const router = require("express").Router();
const userMangementController = require("../userController/UserMangmentController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /userMangement/view:
 *   get:
 *     tags:
 *       - userMangement
 *     description: view
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: query
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Thanks, You have successfully view.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */
router.get("/view", userMangementController.view);

/**
 * @swagger
 * /userMangement/list:
 *   get:
 *     tags:
 *       - userMangement
 *     description: list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Thanks, You have successfully list.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.get("/list", auth.verifyToken, userMangementController.list);

/**
 * @swagger
 * /userMangement/add:
 *   put:
 *     tags:
 *       - userMangement
 *     description: add
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: _id
 *         description: _id required.
 *         in: formData
 *         required: true
 *       - name: type
 *         description: type required.
 *         in: formData
 *         required: true
 *       - name: title
 *         description: title required.
 *         in: formData
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Thanks, You have successfully add.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.put("/add", userMangementController.add);

/**
 * @swagger
 * /userMangement/delete:
 *   delete:
 *     tags:
 *       - userMangement
 *     description: delete
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: token required.
 *         in: header
 *         required: true
 *       - name: _id
 *         description: _id required.
 *         in: formData
 *         required: true

 * 
 *     responses:
 *       200:
 *         description: Thanks, You have successfully add.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.delete("/delete", auth.verifyToken, userMangementController.delete);

// router.block("/block", userMangementController.block);

module.exports = router;
