const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

const schema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post("/", validateWith(schema), (req, res) => {
  const { username, password } = req.body;

  const user = usersStore.getUserByUsername(username);
  if (!user || user.password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: user.id, name: user.name, username: user.username },
    "jwtPrivateKey"
  );
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    accessToken: token,
  });
});

module.exports = router;
