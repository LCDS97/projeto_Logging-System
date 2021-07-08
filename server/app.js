// ANCHOR Sequelize - server
const express = require('express');
const app = express();
const cors = require('cors');

// NOTE Usando o cors para requisições externas e definindo que o express aceite json para requests e responses
app.use(express.json());
app.use(cors());

const db = require("./models");

// NOTE Rotas do projeto
const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);


// NOTE Definindo que o sequelize ira checar todos as tabelas do banco com os da pasta 'models', quando iniciar a API, caso a tabela não existe ele irá criar com o método sync

db.sequelize.sync().then(() => {

    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });

})



