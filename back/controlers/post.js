const Post = require('../models/post');
const fs = require('fs');
const user = require('../models/user');

exports.createPost = (req, res, next) => {
    const postObject = {
        content: req.body.content,
        pseudo: req.body.pseudo,
        userImg: req.body.userImg,

    }
    //  delete postObject._id;
    // delete postObject._userId;
    if(req.file) {
        postObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
    });
    console.log(post);
    post.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    // delete postObject.userId;

    Post.findOne({ _id: req.params.id })

        .then((post) => {
            if(post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                Post.findOneAndUpdate({ _id: req.params.id }, {
                    $set:
                        { content: req.body.content }
                }
                )
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if(post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {

                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                    .catch(error => res.status(401).json({ error }));

            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch(error => res.status(404).json({ error, msg: 'post non trouvée' }));
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

module.exports.likePost = (req, res) => {

    Post.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: { "likers": req.body.userId },
        },
        { returnNewDocument: true }

    )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
};

module.exports.unlikePost = async (req, res) => {

    Post.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: { "likers": req.body.userId },
        },
        { new: true }
    )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
};


