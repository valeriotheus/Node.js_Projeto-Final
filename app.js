const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

// Dados simulados em memória (arrays globais)
let categorias = [
  { id: 1, nome: "BackEnd" },
  { id: 2, nome: "FrontEnd" }
];

let alunos = [
  { id: 1, nome: "Sophie" },
  { id: 2, nome: "Matteo" }
];

let cursos = [
  { id: 1, nome: "Node.js" },
  { id: 2, nome: "React" }
];

// Rota principal
app.get("/", (req, res) => {
  res.render("index");
});

/* --------- ROTAS CATEGORIAS --------- */

// Listar categorias
app.get("/categorias", (req, res) => {
  res.render("categorias/show", { categorias });
});

// Formulário adicionar categoria
app.get("/categorias/add", (req, res) => {
  res.render("categorias/add");
});

// Receber post adicionar categoria
app.post("/categorias/add", (req, res) => {
  const { nome } = req.body;
  const id = categorias.length ? categorias[categorias.length - 1].id + 1 : 1;
  categorias.push({ id, nome });
  res.redirect("/categorias");
});

// Formulário editar categoria
app.get("/categorias/edit/:id", (req, res) => {
  const categoria = categorias.find(cat => cat.id === parseInt(req.params.id));
  if (!categoria) return res.sendStatus(404);
  res.render("categorias/edit", { categoria });
});

// Receber post editar categoria
app.post("/categorias/edit/:id", (req, res) => {
  const { nome } = req.body;
  const categoria = categorias.find(cat => cat.id === parseInt(req.params.id));
  if (!categoria) return res.sendStatus(404);
  categoria.nome = nome;
  res.redirect("/categorias");
});

// Deletar categoria
app.get("/categorias/delete/:id", (req, res) => {
  categorias = categorias.filter(cat => cat.id !== parseInt(req.params.id));
  res.redirect("/categorias");
});

/* --------- ROTAS ALUNOS --------- */

// Listar alunos
app.get("/alunos", (req, res) => {
  res.render("alunos/show", { alunos });
});

// Formulário adicionar aluno
app.get("/alunos/add", (req, res) => {
  res.render("alunos/add");
});

// Receber post adicionar aluno
app.post("/alunos/add", (req, res) => {
  const { nome } = req.body;
  const id = alunos.length ? alunos[alunos.length - 1].id + 1 : 1;
  alunos.push({ id, nome });
  res.redirect("/alunos");
});

// Formulário editar aluno
app.get("/alunos/edit/:id", (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.sendStatus(404);
  res.render("alunos/edit", { aluno });
});

// Receber post editar aluno
app.post("/alunos/edit/:id", (req, res) => {
  const { nome } = req.body;
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.sendStatus(404);
  aluno.nome = nome;
  res.redirect("/alunos");
});

// Deletar aluno
app.get("/alunos/delete/:id", (req, res) => {
  alunos = alunos.filter(a => a.id !== parseInt(req.params.id));
  res.redirect("/alunos");
});

/* --------- ROTAS CURSOS --------- */

// Listar cursos
app.get("/cursos", (req, res) => {
  res.render("cursos/show", { cursos });
});

// Formulário adicionar curso
app.get("/cursos/add", (req, res) => {
  res.render("cursos/add");
});

// Receber post adicionar curso
app.post("/cursos/add", (req, res) => {
  const { nome } = req.body;
  const id = cursos.length ? cursos[cursos.length - 1].id + 1 : 1;
  cursos.push({ id, nome });
  res.redirect("/cursos");
});

// Formulário editar curso
app.get("/cursos/edit/:id", (req, res) => {
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) return res.sendStatus(404);
  res.render("cursos/edit", { curso });
});

// Receber post editar curso
app.post("/cursos/edit/:id", (req, res) => {
  const { nome } = req.body;
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) return res.sendStatus(404);
  curso.nome = nome;
  res.redirect("/cursos");
});

// Deletar curso
app.get("/cursos/delete/:id", (req, res) => {
  cursos = cursos.filter(c => c.id !== parseInt(req.params.id));
  res.redirect("/cursos");
});

/* --------- ROTA EQUIPE --------- */

app.get("/equipe", (req, res) => {
  res.render("equipe");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
