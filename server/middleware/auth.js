const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const bearerHeader = req.header("Authorization");

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
      const payload = jwt.verify(token, "jwtPrivateKey"); //// Here I am verifying token
      req.user = payload; //// Here I am extracting USER's data out of the token
      next();
    } catch (err) {
      res.status(400).send({ error: "Invalid token." });
    }
  } else {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
};
