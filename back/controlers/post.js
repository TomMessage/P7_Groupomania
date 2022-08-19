const Post = require('../models/post');
const fs = require('fs');
const user = require('../models/user');

exports.createPost = (req, res, next) => {
    const postObject = {
        content: req.body.content,

    }
    //  delete postObject._id;
    // delete postObject._userId;

    console.log(req.auth.userId);
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
            console.log(post)
            if(post._id != req.auth.userId) {
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

module.exports.commentPost = async (req, res) => {
    Post.updateOne(
        { _id: req.params.id },
        {
            $push: {
                comments: {
                    commenterId: req.body.commenterId,
                    text: req.body.text,
                },
            },
        },
    )
        .then(() => res.status(200).json({ message: 'commentaire publié' }))
        .catch((err) => res.status(500).send({ message: err }));
};

module.exports.editCommentPost = async (req, res) => {
    if(commenterId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
    } else {
        Post.updateOne(
            {
                _id: req.params.id,
                commenterId: req.body.commenterId,
                "comments._id": req.body.commentId,
            },
            {
                $set: {
                    "comments.$.text": req.body.text,
                },
            }
        )
            .then(() => res.status(200).json({ message: 'commentaire modifié' }))
            .catch((err) => res.status(500).send({ message: err }));
    }

};

module.exports.deleteCommentPost = async (req, res) => {
    if(commenterId != req.auth.userId) {
        res.status(401).json({ message: 'Non-autorisé' });
    } else {
        Post.updateOne(
            { _id: req.params.id },
            {
                $pull: { comments: { _id: req.body.commentId } },
            },
            (err, docs) => {
                if(!err) res.send(docs);
                else console.log("il y a une erreur" + err);
            }
        );
    }
};
