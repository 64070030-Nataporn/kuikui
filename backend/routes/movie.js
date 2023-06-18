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
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/moviepage", async function (req, res, next) {
    try {
      const [row, column] = await pool.query(`select m.*, avg(rating) as rating
      from movies m
      join movielist ml
      using (movie_id)
      group by movie_id
      order by rating desc
      limit 5;
      `)
      return res.json(row);
    } catch (err) {
      return res.status(500).json(err)
    }
});

router.get("/moviepage/:movie_id", async function (req, res, next) {
  const movie_id = req.params.movie_id;
  try {
    const [row, column] = await pool.query(`select *
    from movies m
    where movie_id = ?`, [movie_id])
    return res.json(row);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.delete("/movie/:movie_id", async function (req, res, next) {
  const movie_id = req.params.movie_id;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "delete from movies where movie_id = ?",
      [movie_id]
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

router.get("/eventsmovie", async function (req, res, next) {
  try {
    let sql = `select *, DATE_FORMAT(appointment, '%Y-%m-%d') AS appointment
    from appointment_movie
    order by appointment`
    const [rows, fields] = await pool.query(sql);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/movie/searchmovie", async function (req, res, next) {
  try {
    const searchmovie = req.query.searchmovie || ''
    console.log(searchmovie)
    let sql = `select m.*, FLOOR(avg(rating)) as rating
    from movies m
    left join movielist ml
    using (movie_id)
    group by (movie_id)
    order by m.name_movie;`
    let cond = []

    if (searchmovie.length > 0) {
      sql = `select m.*, FLOOR(avg(rating)) as rating
      from movies m
      left join movielist ml
      using (movie_id)
      where name_movie like ? || director like ?
      group by (movie_id)
      order by m.name_movie;`
      cond = [`%${searchmovie}%`, `%${searchmovie}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/mov/search/:genre", async function (req, res, next) {
  try {
    const genres = req.params.genre || ''
    let sql = `select m.*, FLOOR(avg(rating)) as rating
    from movies m
    left join movielist ml
    using (movie_id)
    group by (movie_id)
    order by m.name_movie;`
    let cond = []

    if (genres) {
      sql = `select m.*, FLOOR(avg(rating)) as rating
      from movies m
      left join movielist ml
      using (movie_id)
      where genres like ?
      group by (movie_id)
      order by m.name_movie;`
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
  director: Joi.string().required(),
  taglines: Joi.string().required(),
  genres: Joi.string().required()
});
router.post("/createmovie", upload.array("myImage", 5), async function (req, res, next) {
  const file = req.files;
  let pathArray = [];
  await createschema.validateAsync(req.body);

  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const genres = req.body.genres;
  const name = req.body.name;
  const director = req.body.director;
  const taglines = req.body.taglines;

  console.log(genres + name + director + taglines + file[0].path)

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "insert into movies(name_movie, genres, director, taglines, file_path) values (?, ?, ?, ?, ?);",
      [name, genres, director, taglines, file[0].path.substring(6)]
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

router.put("/editmovie/:movie_id", upload.array("myImage") ,async function (req, res, next) {
  console.log(req.files)
  let file = req.files;

  console.log(file)
  let pathArray = [];

  const movie_id = req.params.movie_id;
  const genres = req.body.genres;
  const name = req.body.name;
  const director = req.body.director;
  const taglines = req.body.taglines;

  const [row, column] = await pool.query(`select *
    from movies m   
    where movie_id = ?`, [movie_id])


  if (file.length == 0) {
    file = row[0].file_path
  }

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {

    if (req.files.length == 0) {
      let results = await conn.query(
        `update movies
        set genres=?, name_movie=?, director=?, taglines=?, file_path=?
        where movie_id = ?;`,
        [genres, name, director, taglines, file, movie_id]
      );
    } else {
      let results = await conn.query(
        `update movies
        set genres=?, name_movie=?, director=?, taglines=?, file_path=?
        where movie_id = ?;`,
        [genres, name, director, taglines, file[0].path.substring(6), movie_id]
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

const eventSchema = Joi.object({
  start_time: Joi.date().required(),
  end_time: Joi.date().greater(Joi.ref('start_time')).required()
});
router.post("/add/event/movie", async function (req, res, next) {
  const events = req.body.events;
  const dates = req.body.dates;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const user_id = req.body.user_id;

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    //await eventschema.validateAsync(start_time, end_time);
    let results = await conn.query(
      "insert into appointment_movie(event_name, appointment, start_time, end_time, user_id) values (?, ?, ?, ?, ?);",
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

router.post("/favmovie/:movie_id", async function (req, res, next) {
  const movie_id = req.params.movie_id;
  const review = req.body.review;
  const rating = req.body.rating;
  const user_id = req.body.user_id;
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [row, column] = await conn.query(`select *
    from movielist
    where movie_id = ? and user_id = ?;`,
    [movie_id, user_id]) 

    if (row.length > 0) {
      return res.send('you already fav')
    }

      let results = await conn.query(
        "insert into movielist(user_id, movie_id, review, rating) values (?, ?, ?, ?);",
        [user_id, movie_id, review, rating]
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
  

exports.router = router;
