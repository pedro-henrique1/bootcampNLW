const express = require("express");
const app = express();
require('npm-check')
const db = require("./database/db");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const nunjunck = require("nunjucks");
nunjunck.configure("src/views", {
  express: app,
  noCache: true
});

app.get("/", (req, res) => {
  return res.render("index.html");
});
app.get("/creat-point", (req, res) => {
  return res.render("creat-point.html", { saved: true });
});

app.post("/save", function(req, res) {
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ];
  function afterInsretData(err) {
    if (err) {
      return res.send("Erro no cadastro");
     
    }
    console.log("Cadasstro com sucesso");
    console.log(this);
    res.render("creat-point.html", { saved: true });
  }
  db.run(query, values, afterInsretData);
});

app.get("/search", (req, res) => {
  const search = req.query.search;
  if (search === "") {
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function(
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;

    return res.render("search-result.html", { places: rows, total });
  });
});

app.listen(9000);
