const router = require("express").Router();
const staticController = require("../userController/staticController");

/**
 * @swagger
 * /admin/view:
 *   get:
 *     tags:
 *       - STATICADMIN
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
router.get("/view", staticController.view);

/**
 * @swagger
 * /admin/list:
 *   get:
 *     tags:
 *       - STATICADMIN
 *     description: list
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
 *         description: Thanks, You have successfully list.
 *       500:
 *         description: Internal Server Error
 *       501:
 *         description: Something went wrong!
 */

router.get("/list", staticController.list);

/**
 * @swagger
 * /admin/add:
 *   put:
 *     tags:
 *       - STATICADMIN
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

router.put("/add", staticController.add);

module.exports = router;
