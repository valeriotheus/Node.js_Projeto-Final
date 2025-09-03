const express = require("express");
const router = express.Router();

// Listar cadastros
router.get("/", (req, res) => {
  res.render("cadastros/show", { cadastros: req.cadastros });
});

// Formulário adicionar cadastro
router.get("/add", (req, res) => {
  res.render("cadastros/add");
});

// POST adicionar
router.post("/add", (req, res) => {
  const { nome, email } = req.body;
  const cadastros = req.cadastros;
  const id = cadastros.length ? cadastros[cadastros.length - 1].id + 1 : 1;
  cadastros.push({ id, nome, email });
  res.redirect("/cadastros");
});

// Formulário editar
router.get("/edit/:id", (req, res) => {
  const cadastro = req.cadastros.find(c => c.id === parseInt(req.params.id));
  if (!cadastro) return res.sendStatus(404);
  res.render("cadastros/edit", { cadastro });
});

// POST editar
router.post("/edit/:id", (req, res) => {
  const { nome, email } = req.body;
  const cadastro = req.cadastros.find(c => c.id === parseInt(req.params.id));
  if (!cadastro) return res.sendStatus(404);
  cadastro.nome = nome;
  cadastro.email = email;
  res.redirect("/cadastros");
});

// Deletar
router.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let cadastros = req.cadastros;
  cadastros = cadastros.filter(c => c.id !== id);
  req.setCadastros(cadastros); // Atualiza no escopo principal
  res.redirect("/cadastros");
});

module.exports = router;
