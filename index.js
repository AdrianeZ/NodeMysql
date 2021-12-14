const express = require("express");
const {engine} = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const todoRouter = require("./routes/todoRoutes");
const errorHandler = require("./controllers/errorController");

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', "./views");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use("/todos", todoRouter);

app.get("/", (req,res) =>
{
    res.redirect("/todos");
})

app.all("*", (req,res) =>
{
    res.status(404).send("<h1> 404 Not Found </h1>");
})
app.use(errorHandler);


app.listen(3000, "0.0.0.0");
