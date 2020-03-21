const { decode } = require('../helpers/jwt')

module.exports = (req, res, next, mustBeAdmin = false) => {
  try {
    const token = req.headers.authorization
    const decoded_token = decode(token)
    if(!decoded_token.isAdmin && mustBeAdmin) {
      res.status(403).json({ message: "Must be an admin!" });
    }
    req.user = decoded_token

    console.log('decoded_token ', decoded_token)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Auth failed!" });
  }
};

