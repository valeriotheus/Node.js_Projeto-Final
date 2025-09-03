const express = require("express");
const path = require("path");
const app = express();
const router = require("./router"); // ou o caminho correto para o arquivo que você mostrou

// Configurar EJS como engine de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Usar as rotas definidas no router
app.use("/", router);

// Inicializa o servidor (localmente, Vercel ignora isso)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exporta o app para uso no Vercel
module.exports = app;
