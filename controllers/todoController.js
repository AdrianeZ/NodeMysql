const TodoRecord = require("../records/todo.record");

async function getTodos(req, res, next)
{
    try {
        const todos = await TodoRecord.getAll();
        res.render("home",
            {
                todos
            });

    } catch (error) {
        next(error);
    }
}

async function getTodo(req, res, next)
{
    try {
        const {id} = req.params;
        const todo = await TodoRecord.find(id);
        if (!todo) throw new Error("TODO was not Found");
        res.send(todo);

    } catch (error) {
        next(error);
    }
}

async function addTodo(req, res, next)
{

    try {
        const {title} = req.body;
        const newTodo = new TodoRecord(title);
        await newTodo.insert();
        res.status(201).render("added", {title: newTodo.title});
    } catch (error) {
        next(error);
    }
}

async function deleteTodo(req, res, next)
{
    try {
        const {id} = req.params;
        const todo = await TodoRecord.find(id);
        if (!todo) throw new Error("TODO was not Found");
        await todo.delete();
        const title = todo.title;

        res.render("deleted",
            {
                title
            })
    } catch (error) {
        next(error);
    }

}

module.exports =
    {
        getTodos,
        deleteTodo,
        getTodo,
        addTodo
    };