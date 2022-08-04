const express = require('express');
const router = express.Router();

const userCtrl = require('../controlers/user');
const auth = require('../middleware/auth');
const userCheck = require('../middleware/user-check');

router.get("/", auth, userCtrl.getAll);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCheck, userCtrl.modifyUser);
router.delete("/:id", auth, userCheck, userCtrl.deleteUser);

module.exports = router;