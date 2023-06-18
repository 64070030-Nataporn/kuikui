const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

const usernameValidator = async (value, helpers) => { 
    const [rows] = await pool.query("SELECT username FROM People WHERE username = ?", [value]);
    if (rows.length > 0) {
        const message = 'This username is already taken';
        throw new Joi.ValidationError(message, { message });
    }
    return value;
};

const emailValidator = async (value, helpers) => {
    const [rows] = await pool.query("SELECT email FROM People WHERE email = ?", [value]);
    if (rows.length > 0) {
        const message = 'This email is already taken';
        throw new Joi.ValidationError(message, { message });
    }
    return value;
};

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}
const signupSchema = Joi.object({ //validate backend
    email: Joi.string().required().email().external(emailValidator),
    username: Joi.string().required().max(15).external(usernameValidator), 
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    typefav: Joi.array().min(1).required()
});



router.post('/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false }); //{ abortEarly: false } เพื่อไม่ให้หยุดการตรวจสอบทันที
    } catch (err) {
        return res.status(400).send(err);
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    const password = await bcrypt.hash(req.body.password, 5); //แปลงรหัส
    const email = req.body.email;
    const username = req.body.username;
    const typefav = req.body.typefav;


    try {
        await conn.query(
            'INSERT INTO People(username, email, password, type_fav) VALUES (?, ?, ?, ?)', //เพิ่มข้อมูลที่สมัครเขาDB
            [username, email, password, typefav]
        );
        await conn.query(
            'INSERT INTO Profiles(name_profile, email, type_fav, file_path) VALUES (?, ?, ?, ?)', //เพิ่มข้อมูลที่สมัครเขาDB
            [username, email, typefav, ""]
        );
        conn.commit();
        res.status(201).send();
    } catch (err) {
        conn.rollback();
        res.status(400).json(err.toString());
    } finally {
        conn.release();
    }
});

const loginSchema = Joi.object({ //validate
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(passwordValidator),
})
router.post('/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const email = req.body.email
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {

        const [emailinfo] = await conn.query( //เอาemail ที่กรอกไปเทียบกับ  db
            'SELECT * FROM people WHERE email=?',
            [email]
        )
        const user = emailinfo[0]
        if (!user) { 
            throw new Error('Incorrect username')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE email = ?',
            [user.email]  //ดึง token ของอีเมลมา
        )
        let token = tokens[0]?.token //? ถ้าเป็นnull จะไม่เกิด error
        if (!token) {                                   //ถ้าเมลนั้นยังไม่มีtoken ทำการเพิ่มเข้าdb
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(email, token) VALUES (?, ?)',
                [user.email, token]
            )
        }
        conn.commit()
        res.status(200).json({ 'token': token }) //ส่งออก
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})
// router.get('/bookchat', async (req, res, next) => {

// })
router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})

router.get('/user/favlist/:email', async (req, res, next) => {
    const email = req.params.email;

    const [row, column] = await pool.query(`select *
    from Profiles
    join People
    using (email)
    where email = ?;`, [email])

    try {

        if (row[0].type_fav == 1) {
            const [row2, column2] = await pool.query(`select *
        from books b
        join booklist bl
        using (book_id)
        where user_id = ?;`, [row[0].user_id])
            return res.json(row2);
        } else if (row[0].type_fav == 2) {
            const [row3, column3] = await pool.query(`select *
            from songs s
            join playlist pl
            using (song_id)
            where user_id = ?;`, [row[0].user_id])
            return res.json(row3);
        } else if (row[0].type_fav == 3) {
            const [row4, column4] = await pool.query(`select *
            from movies m
            join movielist ml
            using (movie_id)
            where user_id = ?;`, [row[0].user_id])
            return res.json(row4);
        }

    } catch (err) {
        return res.status(500).json(err)
    }

    console.log(row)
})

router.put("/fav/:id", async function (req, res, next) {

    const id = req.params.id;
    const review = req.body.review;
    const rating = req.body.rating;
    const user_id = req.body.user_id;
    const type_fav = req.body.type_fav;

    console.log(type_fav)
    console.log(id)
    console.log(user_id)
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        let [row, column] = ""

        if (type_fav == 1) {
            [row, column] = await conn.query(`select *
            from booklist
            where book_id = ? and user_id = ?;`,
                [id, user_id])
                console.log(row)
        } else if (type_fav == 2) {
             [row, column] = await conn.query(`select *
            from playlist
            where song_id = ? and user_id = ?;`,
                [id, user_id])
        } else if (type_fav == 3) {
             [row, column] = await conn.query(`select *
            from movielist
            where movie_id = ? and user_id = ?;`,
                [id, user_id])
        }

        console.log(row)
        if (row.length == 0) {
            return res.send('your list is not have this fav')
        }

        if (type_fav == 1) {
            let results = await conn.query(
                `update booklist
                set review = ?, rating = ?
                where book_id = ? and user_id = ?;`,
                [review, rating, id, user_id]
            );
        } else if (type_fav == 2) {
            let results = await conn.query(
                `update playlist
                set review = ?, rating = ?
                where song_id = ? and user_id = ?;`,
                [review, rating, id, user_id]
            );

        } else if (type_fav == 3) {
            let results = await conn.query(
                `update movielist
                set review = ?, rating = ?
                where movie_id = ? and user_id = ?;`,
                [review, rating, id, user_id]
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

router.delete("/fav/:id/:user_id/:type_fav", async function (req, res, next) {

    const id = req.params.id;
    const user_id = req.params.user_id;
    const type_fav = req.params.type_fav;

    console.log(type_fav)
    console.log(id)
    console.log(user_id)
    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        let [row, column] = ""

        if (type_fav == 1) {
            [row, column] = await conn.query(`select *
            from booklist
            where book_id = ? and user_id = ?;`,
                [id, user_id])
                console.log(row)
        } else if (type_fav == 2) {
             [row, column] = await conn.query(`select *
            from playlist
            where song_id = ? and user_id = ?;`,
                [id, user_id])
        } else if (type_fav == 3) {
             [row, column] = await conn.query(`select *
            from movielist
            where movie_id = ? and user_id = ?;`,
                [id, user_id])
        }

        console.log(row)
        if (row.length == 0) {
            return res.send('your list is not have this fav')
        }

        if (type_fav == 1) {
            let results = await conn.query(
                `delete from booklist
                where book_id = ? and user_id = ?;`,
                [id, user_id]
            );
        } else if (type_fav == 2) {
            let results = await conn.query(
                `delete from playlist
                where song_id = ? and user_id = ?;`,
                [id, user_id]
            );

        } else if (type_fav == 3) {
            let results = await conn.query(
                `delete from movielist
                where movie_id = ? and user_id = ?;`,
                [id, user_id]
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
