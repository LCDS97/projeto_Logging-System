// ANCHOR Sequelize - server
const express = require('express');
const app = express();

const db = require('./models')



// NOTE Definindo que o sequelize ira checar todos as tabelas do banco com os da pasta 'models', quando iniciar a API, caso a tabela não existe ele irá criar com o método sync

db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });

})



