const express = require("express");
const pool = require("../config");
const router = express.Router();

router.post("/bookchat", async (req, res, next) => {
  const message = req.body.message;
  const email = req.body.email;
  const username = req.body.username;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      "INSERT INTO chat(email, username, message) VALUES (?, ?, ?)",
      [email, username, message]
    );
    // const [id] = await conn.query(
    //     'SELECT message FROM people WHERE email=?',
    //     [email]
    // )
    const [sender] = await conn.query("SELECT * FROM chat WHERE email=?", [email]);
    const [outer] = await conn.query("SELECT * FROM chat WHERE email!=?", [email]);
    const [all] = await conn.query("SELECT * FROM chat", [email]);
    conn.commit();
    res.status(201).json({all});
  } catch (err) {
    conn.rollback();
    res.status(400);
  } finally {
    conn.release();
  }
});



router.post("/musicchat", async (req, res, next) => {
    const message = req.body.message;
    const email = req.body.email;
    const username = req.body.username;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        "INSERT INTO musicchat(email, username, message) VALUES (?, ?, ?)",
        [email, username, message]
      );
      // const [id] = await conn.query(
      //     'SELECT message FROM people WHERE email=?',
      //     [email]
      // )
    //   const [sender] = await conn.query("SELECT * FROM musicchat WHERE email=?", [email]);
    //   const [outer] = await conn.query("SELECT * FROM musicchat WHERE email!=?", [email]);
      const [all] = await conn.query("SELECT * FROM musicchat", [email]);
      conn.commit();
      res.status(201).json({all});
    } catch (err) {
      conn.rollback();
      res.status(400);
    } finally {
      conn.release();
    }
  });

  router.post("/moviechat", async (req, res, next) => {
    const message = req.body.message;
    const email = req.body.email;
    const username = req.body.username;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      await conn.query(
        "INSERT INTO moviechat(email, username, message) VALUES (?, ?, ?)",
        [email, username, message]
      );
      // const [id] = await conn.query(
      //     'SELECT message FROM people WHERE email=?',
      //     [email]
      // )
    //   const [sender] = await conn.query("SELECT * FROM musicchat WHERE email=?", [email]);
    //   const [outer] = await conn.query("SELECT * FROM musicchat WHERE email!=?", [email]);
      const [all] = await conn.query("SELECT * FROM moviechat", [email]);
      conn.commit();
      res.status(201).json({all});
    } catch (err) {
      conn.rollback();
      res.status(400);
    } finally {
      conn.release();
    }
  });
exports.router = router;
