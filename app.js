const express = require("express");
const path = require("path");
const app = express();

// Importar router modularizado
const cadastroRoutes = require("./routes/cadastros");

// Middleware para permitir uso de dados em memória
let cadastros = [
  { id: 1, nome: "Sophie", email: "xxxx" },
  { id: 2, nome: "Matteo", email: "xxxx" }
];

app.use((req, res, next) => {
  req.cadastros = cadastros;
  req.setCadastros = (newCadastros) => { cadastros = newCadastros; };
  next();
});

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

// Configurações básicas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rota principal
app.get("/", (req, res) => {
  res.render("index");
});

/* --------- ROTAS CATEGORIAS --------- */
app.get("/categorias", (req, res) => {
  res.render("categorias/show", { categorias });
});

app.get("/categorias/add", (req, res) => {
  res.render("categorias/add");
});

app.post("/categorias/add", (req, res) => {
  const { nome } = req.body;
  const id = categorias.length ? categorias[categorias.length - 1].id + 1 : 1;
  categorias.push({ id, nome });
  res.redirect("/categorias");
});

app.get("/categorias/edit/:id", (req, res) => {
  const categoria = categorias.find(cat => cat.id === parseInt(req.params.id));
  if (!categoria) return res.sendStatus(404);
  res.render("categorias/edit", { categoria });
});

app.post("/categorias/edit/:id", (req, res) => {
  const { nome } = req.body;
  const categoria = categorias.find(cat => cat.id === parseInt(req.params.id));
  if (!categoria) return res.sendStatus(404);
  categoria.nome = nome;
  res.redirect("/categorias");
});

app.get("/categorias/delete/:id", (req, res) => {
  categorias = categorias.filter(cat => cat.id !== parseInt(req.params.id));
  res.redirect("/categorias");
});

/* --------- ROTAS ALUNOS --------- */
app.get("/alunos", (req, res) => {
  res.render("alunos/show", { alunos });
});

app.get("/alunos/add", (req, res) => {
  res.render("alunos/add");
});

app.post("/alunos/add", (req, res) => {
  const { nome } = req.body;
  const id = alunos.length ? alunos[alunos.length - 1].id + 1 : 1;
  alunos.push({ id, nome });
  res.redirect("/alunos");
});

app.get("/alunos/edit/:id", (req, res) => {
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.sendStatus(404);
  res.render("alunos/edit", { aluno });
});

app.post("/alunos/edit/:id", (req, res) => {
  const { nome } = req.body;
  const aluno = alunos.find(a => a.id === parseInt(req.params.id));
  if (!aluno) return res.sendStatus(404);
  aluno.nome = nome;
  res.redirect("/alunos");
});

app.get("/alunos/delete/:id", (req, res) => {
  alunos = alunos.filter(a => a.id !== parseInt(req.params.id));
  res.redirect("/alunos");
});

/* --------- ROTAS CURSOS --------- */
app.get("/cursos", (req, res) => {
  res.render("cursos/show", { cursos });
});

app.get("/cursos/add", (req, res) => {
  res.render("cursos/add");
});

app.post("/cursos/add", (req, res) => {
  const { nome } = req.body;
  const id = cursos.length ? cursos[cursos.length - 1].id + 1 : 1;
  cursos.push({ id, nome });
  res.redirect("/cursos");
});

app.get("/cursos/edit/:id", (req, res) => {
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) return res.sendStatus(404);
  res.render("cursos/edit", { curso });
});

app.post("/cursos/edit/:id", (req, res) => {
  const { nome } = req.body;
  const curso = cursos.find(c => c.id === parseInt(req.params.id));
  if (!curso) return res.sendStatus(404);
  curso.nome = nome;
  res.redirect("/cursos");
});

app.get("/cursos/delete/:id", (req, res) => {
  cursos = cursos.filter(c => c.id !== parseInt(req.params.id));
  res.redirect("/cursos");
});

/* --------- ROTA EQUIPE --------- */
app.get("/equipe", (req, res) => {
  res.render("equipe");
});

/* --------- ROTAS CADASTROS --------- */
app.use("/cadastros", cadastroRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
