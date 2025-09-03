const express = require("express");
const path = require("path");
const app = express();
const router = require("./router"); // ajuste o caminho se precisar

// Configurar EJS como engine de visualização
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Usar as rotas definidas no router
app.use("/", router);

// Somente iniciar servidor localmente (não no Vercel)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

// Exporta o app para uso no Vercel
module.exports = app;
