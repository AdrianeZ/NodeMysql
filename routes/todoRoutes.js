const express = require("express");
const {getTodos, deleteTodo,getTodo,addTodo} = require("../controllers/todoController");

const router = express.Router();

router.route("/").get(getTodos).post(addTodo);
router.route("/:id").get(getTodo).patch().delete(deleteTodo);

module.exports = router;