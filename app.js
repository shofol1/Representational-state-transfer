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
console.log(uri);
//creating schema
const articleSchema = mongoose.Schema({
  tile: String,
  content: String,
});

//creating model
const Article = mongoose.model("articles", articleSchema);

//TODO
app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      console.log(foundArticles);
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log("Server started on port ", process.env.PORT);
});
