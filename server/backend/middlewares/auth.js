const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({message: "Access Denied"});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({message: "Invalid Token"});
    }
};

module.exports = verifyToken;

s2Efv3K9N2yJFVf4