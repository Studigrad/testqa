const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(JSON.stringify(token))
    if (!token) return res.status(401).json({ message: 'No token provided.' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Failed to authenticate token.' });
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;