const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares')
const { blogOwner } = require('../middlewares')
const Joi = require('joi');
router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/bookpage", async function (req, res, next) {
    try {
      const [row, column] = await pool.query(`select b.*, avg(bl.rating) as rating
      from books b
      join booklist bl
      using (book_id)
      group by (book_id)
      order by rating desc
      limit 5;`)
      return res.json(row);
    } catch (err) {
      return res.status(500).json(err)
    }
});

router.get("/bookpage/:book_id", async function (req, res, next) {
  const book_id = req.params.book_id;
  try {
    const [row, column] = await pool.query(`select *
    from books b   
    where book_id = ?`, [book_id])
    return res.json(row);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.delete("/book/:book_id", async function (req, res, next) {
  const book_id = req.params.book_id;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "delete from books where book_id = ?",
      [book_id]
    );

    await conn.commit();
    res.send("success!");

  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }

});

router.get("/eventsbook", async function (req, res, next) {
  try {
    let sql = `select *, DATE_FORMAT(appointment, '%Y-%m-%d') AS appointment
    from appointment_book
    order by appointment`
    const [rows, fields] = await pool.query(sql);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/book/searchbook", async function (req, res, next) {
  try {
    const searchbook = req.query.searchbook || ''
    console.log(searchbook)
    let sql = `select b.*, FLOOR(avg(rating)) as rating
    from books b
    left join booklist bl
    using (book_id)
    group by (book_id)
    order by b.name_book;`
    let cond = []

    if (searchbook.length > 0) {
      sql = `select b.*, FLOOR(avg(rating)) as rating
      from books b
      left join booklist bl
      using (book_id)
      where name_book like ? || author like ?
      group by (book_id)
      order by b.name_book;`
      cond = [`%${searchbook}%`, `%${searchbook}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/book/search/:genre", async function (req, res, next) {
  try {
    const genres = req.params.genre || ''
    let sql = `select b.*, FLOOR(avg(rating)) as rating
    from books b
    left join booklist bl
    using (book_id)
    group by (book_id)
    order by b.name_book;`
    let cond = []

    if (genres) {
      sql = `select b.*, FLOOR(avg(rating)) as rating
      from books b
      left join booklist bl
      using (book_id)
      where genres like ?
      group by (book_id)
      order by b.name_book;`
      cond = [`%${genres}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});
const createschema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  genres: Joi.string()
});
router.post("/createbook", upload.array("myImage", 1) ,async function (req, res, next) {
  console.log(req.files)
  const file = req.files;
  let pathArray = [];

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const genres = req.body.genres;
  const name = req.body.name;
  const author = req.body.author;
  const description = req.body.description;

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await createschema.validateAsync(req.body);
    let results = await conn.query(
      "insert into books(genres, name_book, author, `describe`, file_path) values (?, ?, ?, ?, ?);",
      [genres, name, author, description, file[0].path.substring(6)]
    );

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

router.put("/editbook/:book_id", upload.array("myImage") ,async function (req, res, next) {
  console.log(req.files)
  let file = req.files;

  console.log(file)
  let pathArray = [];

  const book_id = req.params.book_id;
  const genres = req.body.genres;
  const name = req.body.name;
  const author = req.body.author;
  const description = req.body.description;

  const [row, column] = await pool.query(`select *
    from books b   
    where book_id = ?`, [book_id])

    console.log(row[0].file_path)

  if (file.length == 0) {
    file = row[0].file_path
  }

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {

    if (req.files.length == 0) {
      let results = await conn.query(
        `update books
        set genres=?, name_book=?, author=?, books.describe=?, file_path=?
        where book_id = ?;`,
        [genres, name, author, description, file, book_id]
      );
    } else {
      let results = await conn.query(
        `update books
        set genres=?, name_book=?, author=?, books.describe=?, file_path=?
        where book_id = ?;`,
        [genres, name, author, description, file[0].path.substring(6), book_id]
      );
    }

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});



router.post("/add/event/book", async function (req, res, next) {
  const events = req.body.events;
  const dates = req.body.dates;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const user_id = req.body.user_id;

  //await eventSchema.validateAsync(start_time, end_time);

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "insert into appointment_book(event_name, appointment, start_time, end_time, user_id) values (?, ?, ?, ?, ?);",
      [events, dates, start_time, end_time, user_id]
    );

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
})

router.post("/favbook/:book_id", async function (req, res, next) {
  const book_id = req.params.book_id;
  const review = req.body.review;
  const rating = req.body.rating;
  const user_id = req.body.user_id;
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [row, column] = await conn.query(`select *
    from booklist
    where book_id = ? and user_id = ?;`,
    [book_id, user_id]) 

    if (row.length > 0) {
      return res.send('you already fav')
    }

    if (row.length == 0) {
      let results = await conn.query(
        "insert into booklist(user_id, book_id, review, rating) values (?, ?, ?, ?);",
        [user_id, book_id, review, rating]
      );
    }

    await conn.commit();
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
})
  

exports.router = router;
