const pool = require("./utils/db");
const TodoRecord = require("./records/todo.record");

(async () => {
    const c = await TodoRecord.find("ec06188d-8d8f-410e-b5da-def6e4a35d44");
    await c?.update("sfdsfasfafasf");
    await c?.insert();
    await pool.end();
})();

