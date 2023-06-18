const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");
const { isLoggedIn } = require('../middlewares')
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

router.get("/songpage", async function (req, res, next) {
    try {
      const [row, column] = await pool.query(`select s.*, avg(rating) as rating
      from songs s
      join playlist pl
      using (song_id)
      group by song_id
      order by rating desc
      limit 5;`)
      return res.json(row);
    } catch (err) {
      return res.status(500).json(err)
    }
});

router.get("/songpage/:song_id", async function (req, res, next) {
  const song_id = req.params.song_id;
  try {
    const [row, column] = await pool.query(`select *
    from songs b   
    where song_id = ?`, [song_id])
    return res.json(row);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.put("/editsong/:song_id", upload.array("myImage") ,async function (req, res, next) {
  console.log(req.files)
  let file = req.files;

  console.log(file)
  let pathArray = [];

  const song_id = req.params.song_id;
  const genres = req.body.genres;
  const name = req.body.name;
  const artist = req.body.artist;

  const [row, column] = await pool.query(`select *
    from songs b   
    where song_id = ?`, [song_id])

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
        `update songs
        set genres=?, name_song=?, artist=?, file_path=?
        where song_id = ?;`,
        [genres, name, artist, file, song_id]
      );
    } else {
      let results = await conn.query(
        `update songs
        set genres=?, name_song=?, artist=?, file_path=?
        where song_id = ?;`,
        [genres, name, artist, file[0].path.substring(6), song_id]
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

router.delete("/song/:song_id", async function (req, res, next) {
  const song_id = req.params.song_id;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "delete from songs where song_id = ?",
      [song_id]
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

router.get("/eventssong", async function (req, res, next) {
  try {
    let sql = `select *, DATE_FORMAT(appointment, '%Y-%m-%d') AS appointment
    from appointment_song
    order by appointment`
    const [rows, fields] = await pool.query(sql);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/song/searchsong", async function (req, res, next) {
  try {
    const searchsong = req.query.searchsong || ''
    console.log(searchsong)
    let sql = `select s.*, FLOOR(avg(rating)) as rating
    from songs s
    left join playlist pl
    using (song_id)
    group by (song_id)
    order by s.name_song;`
    let cond = []

    if (searchsong.length > 0) {
      sql = `select s.*, FLOOR(avg(rating)) as rating
      from songs s
      left join playlist pl
      using (song_id)
      where name_song like ? || artist like ?
      group by (song_id)
      order by s.name_song;`
      cond = [`%${searchsong}%`, `%${searchsong}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/song/search/:genre", async function (req, res, next) {
  try {
    const genres = req.params.genre || ''
    let sql = `select s.*, FLOOR(avg(rating)) as rating
    from songs s
    left join playlist pl
    using (song_id)
    group by (song_id)
    order by s.name_song;`
    let cond = []

    if (genres) {
      sql = `select s.*, FLOOR(avg(rating)) as rating
      from songs s
      left join playlist pl
      using (song_id)
      where genres like ?
      group by (song_id)
      order by s.name_song;`
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
  artist: Joi.string().required(),
  genres: Joi.string().required()
});
router.post("/createsong", upload.array("myImage", 1), async function (req, res, next) {
  const file = req.files;
  let pathArray = [];
  await createschema.validateAsync(req.body);
  if (!file) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const genres = req.body.genres;
  const name = req.body.name;
  const artist = req.body.artist;

  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    
    let results = await conn.query(
      "insert into songs(genres, name_song, artist, file_path) value (?, ?, ?, ?);",
      [genres, name, artist, file[0].path.substring(6)]
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

router.post("/add/event/song", async function (req, res, next) {
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
      "insert into appointment_song(event_name, appointment, start_time, end_time, user_id) values (?, ?, ?, ?, ?);",
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

router.post("/favsong/:song_id", async function (req, res, next) {
  const song_id = req.params.song_id;
  const review = req.body.review;
  const rating = req.body.rating;
  const user_id = req.body.user_id;
  // Begin transaction
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [row, column] = await conn.query(`select *
    from playlist
    where song_id = ? and user_id = ?;`,
    [song_id, user_id])

    if (row.length > 0) {
      return res.send('you already fav')
    }

      let results = await conn.query(
        "insert into playlist(user_id, song_id, review, rating) values (?, ?, ?, ?);",
        [user_id, song_id, review, rating]
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
