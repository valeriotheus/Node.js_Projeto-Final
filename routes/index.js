const express = require("express"); 
const path = require("path");
const router = express.Router(); 

app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial 

router.get("/", (req, res) => { 

  res.render("base", { 

    title: "Home", 

    view: "index", // Passa a view 'index.ejs' para ser carregada no body 

  }); 

}); 

module.exports = router;