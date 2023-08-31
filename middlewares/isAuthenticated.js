const jwt = require('jsonwebtoken');

const secretKey = 'secretkey';

function authenticateToken(req, res, next) {
  const authHeader = req.header['Authorization']
  
  if (authHeader == null) return res.sendStatus(401)

  jwt.verify(authHeader, secretKey, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user
    res.render('protected')
    next()
  })
}

module.exports = authenticateToken
