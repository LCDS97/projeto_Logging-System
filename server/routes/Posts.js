// ANCHOR Routes - express

// SECTION Using módulo Router do express para definir rotas
const express = require('express');
// NOTE Importando o router
const router = express.Router()

const { Posts } = require('../models');

// NOTE Sequelize necessita que a função seja async
router.get("/", async (req, res) => {
    // NOTE Listando valores do banco para a home, utilizando a query do findAll do sequelize do model Posts
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});


router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})


router.post("/", async (req, res) => {

// NOTE Criando a requisição do POST para o banco de dados, pegando valores do body
    const post = req.body;

// NOTE Importando o método create do Sequelize para fazer o INSERT no banco com as informações da variavel `post`
    await Posts.create(post);
    res.json(post);

})

module.exports = router