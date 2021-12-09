const mysql = require("mysql2/promise");

async function createQuery()
{
  const connection = await mysql.createPool(
      {
        host: "localhost",
        user: "phpmyadmin",
        password: "brutusex12",
        database: "megak_courses"
      }
  )
    //Zad1. Pobieranie wszystkich kursow
  // const [results] = await connection.execute("SELECT * FROM `courses`");
  // console.log(results);

   const [results] = await connection.execute("SELECT `students.id`, `name`, `surname` FROM `students` LEFT JOIN `courses` ON");
    console.log(results);

  await connection.end();

}

createQuery();
