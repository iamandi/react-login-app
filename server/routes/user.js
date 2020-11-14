const express = require("express");
const router = express.Router();

const usersStore = require("../store/users");
const auth = require("../middleware/auth");

router.get("/all", (req, res) => {
  res.send(`This is unprotected content! Anybody can view it.`);
});

router.get("/me", auth, (req, res) => {
  const { userId } = req.user;
  const user = usersStore.getUserById(userId);
  if (!user) return res.status(404).send();

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    content: "This is protected content! You need to be logged in to see it.",
  });
});

module.exports = router;
