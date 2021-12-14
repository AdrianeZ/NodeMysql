const {v4: uuid} = require("uuid");
const pool = require("../utils/db")

class TodoRecord
{

    constructor(title, id = null)
    {

        this.validate(title);
        this.id = id ?? uuid();
        this.title = title;

    }

    static async find(id)
    {
        const [[results]] = await pool.execute("SELECT * FROM `todos` WHERE `id` = :id", {id});
        if (!results) return null;
        return new TodoRecord(results.title, results.id);
    }

    static async getAll()
    {
        const [results] = await pool.execute("SELECT `title`, `id` FROM `todos` ORDER BY `created_at`");
        return results;
    }

    validate(title)
    {
        if (title.trim().length < 5) throw new Error("Title should have at lease five characters");
        if (title.length > 150) throw new Error("Title should not exceed 150 characters");
    }

    async insert()
    {
        const results = await TodoRecord.find(this.id);

        //walidacja czy todos istnieje
        if (results) throw new Error("Todos with this id already exists");

        await pool.execute("INSERT INTO `todos` (`id`, `title`) VALUES(:id,:title)", {
            id: this.id,
            title: this.title
        });
        return this.id;
    }

    async update(title)
    {
        if (!this.id) throw new Error("Todo has no id");
        this.validate(title);
        await pool.execute("UPDATE `todos` SET `title` = :title WHERE `id` = :id", {
            id: this.id,
            title
        });

        this.title = title;
        return this.id;
    }

    async delete()
    {
        if (!this.id) throw new Error("Todo has no id");

        await pool.execute("DELETE FROM `todos` WHERE `id` = :id", {id: this.id});
    }
}

module.exports = TodoRecord;