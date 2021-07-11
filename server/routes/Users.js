const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

const { Users } = require("../models");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      password: hash,
    });
    res.json("Success!");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User doesn't exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Wrong Username and Password Combination" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantSecret"
    );
    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/checkAuth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo)
});

router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await Users.findOne({ where: { username: req.user.username } });
    
    bcrypt.compare(oldPassword, user.password).then( async (match) => {
      if (!match) {
        res.json({ error: "Senha não confere com antiga senha!" });
      }

      bcrypt.hash(newPassword, 10).then((hash) => {
        Users.update(
          {password: hash},
          { where: {username: req.user.username} }
          );
          res.json("Sucesso!");
      });
    });
});

module.exports = router;
