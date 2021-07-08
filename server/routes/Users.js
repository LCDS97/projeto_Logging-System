
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { Users } = require('../models');

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username,
            password: hash,
        })
        res.json("Success!")
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if(!user) {
        res.json({error: "User doesn't exist"})
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({error: "Wrong Username and Password Combination"});
        }

    res.json("Você esta logado!")
    })

})

module.exports = router;