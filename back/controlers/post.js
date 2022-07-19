const Post = require('../models/post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;
    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    post.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject.userId;
    console.log(postObject);
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if(post.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                post.updateOne({ _id: req.params.id }, { ...postObject })
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
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
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

exports.likeOrDislike = (req, res, next) => {
    let like = req.body.like;
    if(like === 1) {
        Post.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.auth.userId }, $inc: { likes: +1 } })
            .then(() => res.status(200).json({ message: 'j\'aime' }))
            .catch(error => res.status(400).json({ error }))
    } else if(like === -1) {
        Post.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.auth.userId }, $inc: { dislikes: +1 } })
            .then(() => res.status(200).json({ message: 'je n\'aime pas' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        Post.findOne({ _id: req.params.id })
            .then(post => {
                if(post.usersLiked.includes(req.auth.userId)) {
                    Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.auth.userId }, $inc: { likes: -1 } })
                        .then(() => res.status(200).json({ message: 'j\'aime supprimé' }))
                        .catch(error => res.status(400).json({ error }))
                } else if(post.usersDisliked.includes(req.auth.userId)) {
                    Post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.auth.userId }, $inc: { dislikes: -1 } })
                        .then(() => res.status(200).json({ message: 'je n\'aime pas supprimé' }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
    }
};