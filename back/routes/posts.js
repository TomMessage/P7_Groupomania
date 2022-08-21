const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const postCtrl = require('../controlers/post');
const multer = require('../middleware/multer-config');

//posts

router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.patch("/like/:id", postCtrl.likePost);
router.patch("/unlike/:id", postCtrl.unlikePost);

module.exports = router;