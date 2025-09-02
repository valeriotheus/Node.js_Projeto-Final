const express = require("express");
const router = express.Router();

//listar categoria
router.get("/", async (req, res) => {
    res.render ("base", {
        title: "Listar Cursos",
        view: "Cursos/show"
    });
});

//edit categoria
router.get("/edit", async (req, res) => {
    res.render ("base", {
        title: "Editar Cursos",
        view: "Cursos/edit"
    });
});

//add categoria
router.get("/add", async (req, res) => {
    res.render ("base", {
        title: "Add Cursos",
        view: "Cursos/add"
    });
});