const User = require('../models/user');


exports.getAll = (req, res, next) => {
    try {
        const users = User.find().select("-password");
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({ message: 'impossible de récupérer les utilisateurs', error });
    }
}
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.auth.userId }).select("-password");
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: 'impossible de récupérer l\'utilisateurs', error });
    }


}
exports.modifyUser = (req, res, next) => {
    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete userObject.userId;
    console.log(userObject);
    User.findOne({ _id: req.params.id })
        .then((user) => {
            if(user.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                user.updateOne({ _id: req.params.id }, { ...userObject })
                    .then(() => res.status(200).json({ message: 'Utilisateur modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if(user.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Utilisateur supprimé !' }) })
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
