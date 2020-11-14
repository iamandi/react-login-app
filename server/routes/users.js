const express = require("express");
const router = express.Router();
const Joi = require("joi");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");

const schema = Joi.object({
  name: Joi.string().required().min(2),
  username: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post("/", validateWith(schema), (req, res) => {
  const { name, username, password } = req.body;
  console.log("name, username, password", name, username, password);
  if (usersStore.getUserByUsername(username))
    return res
      .status(400)
      .send({ error: "A user with the given username already exists." });

  const user = { name, username, password };
  usersStore.addUser(user);

  res.status(201).send(user);
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
