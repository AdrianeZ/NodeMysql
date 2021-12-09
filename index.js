const mysql = require("mysql2/promise");

async function createQuery()
{




    const connection = await mysql.createPool(
        {
          host: "localhost",
          user: "root",
          password: "",
          database: "megak",
          namedPlaceholders: true
        }
    )
    //Zad1. Pobieranie wszystkich kursow
    // const [results] = await connection.execute("SELECT * FROM `courses`");
    // console.log(results);

    //Zad2. Pobranie Wszystkich kursantów wraz z kursami na których są
    //  const [results] = await connection.execute("SELECT `students`.`id`, `students`.`name`, `students`.`surname`, `courses`.`coursename` " +
    //      "FROM `students` LEFT JOIN `students_courses` ON `students`.`id` = `students_courses`.`student_id` LEFT JOIN `courses` ON " +
    //      "`students_courses`.`courseName` = `courses`.`coursename` WHERE `students`.`age` > 18" );
    //   console.log(results);

    // Zad3. usunięcia kursantów poniżej 18 lat (zabawa z ograniczeniami klucza obcego w schema)
    // const thresholdAge = 18;
    // const [{affectedRows}] = await connection.execute("DELETE FROM `students` WHERE `age` < :thresholdAge", {thresholdAge});
    // console.log(affectedRows);

    //Zad 4 Dodawanie pojedyńczego kursanta
    try
    {
    const person = {name:"Kuba", surname:"Andrzejewski", age:46, street:"Moniuszki 12/43"};
    const [{insertId}] = await connection.execute("INSERT INTO `students` (`name`,`surname`, `age`, `street`) VALUES(:name,:surname,:age,:street)", person );
      console.log(insertId);

  }
  catch (error)
  {
    console.log(error);
  }
  finally
  {
    await connection.end();
  }


}

createQuery();
