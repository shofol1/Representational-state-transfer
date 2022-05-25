//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//connection db
const uri = `mongodb://localhost:${process.env.MONGOPORT}/wikiDB`;
mongoose.connect(uri, {
  useNewUrlParser: true,
});
//creating schema
const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});

//creating model
const Article = mongoose.model("articles", articleSchema);

//TODO

//get request
app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      console.log(foundArticles);
    }
  });
});

//post request

app.post("/articles", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(newArticle);

  newArticle.save((err) => {
    if (!err) {
      console.log("Data successfully saved");
    }
  });
  res.send("data inserted");
});

//delete

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("successfully deleted all data!");
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log("Server started on port ", process.env.PORT);
});
