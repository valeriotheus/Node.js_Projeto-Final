router.get("/edit", async (req, res) => { 

  res.render("base", { 

    title: "Editar Categoria", 

    view: "categorias/edit", 

  }); 

}); 

module.exports = router; 