const mysql = require("mysql2/promise");

async function createQuery()
{
  const connection = await mysql.createConnection(
      {
        host: "localhost",
        user: "root",
        password: "",
        database: "book_shop"
      }
  )

  const [{affectedRows}] = await connection.execute("DELETE FROM `books` WHERE `book_id` = 200");
  console.log(affectedRows);

  await connection.end();

}

createQuery();
