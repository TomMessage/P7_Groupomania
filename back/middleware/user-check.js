const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(req.params.id !== req.auth.userId) {
            res.status(401).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};