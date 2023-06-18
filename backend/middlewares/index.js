const pool = require("../config");

async function logger(req, res, next){ //บันทึกข้อมูล
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}



async function isLoggedIn (req, res, next) { //ตรวจสอบสถานะเข้าสู่ระบบ
        let authorization = req.headers.authorization
    
        if (!authorization) { //ถ้าไม่มี = ยังไม่login
            return res.status(401).send('You are not logged in')
        }
    
        let [part1, part2] = authorization.split(' ')
        if (part1 !== 'Bearer' || !part2) {
            return res.status(401).send('You are not logged in')
        }
        
        // Check token
        const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
        const token = tokens[0]
        if (!token) {
            return res.status(401).send('You are not logged in')
        }
    
        // Set user
        const [users] = await pool.query(
            `SELECT username, email, people.type_fav, user_id, role
            FROM people 
            join Profiles
            using (email)
            WHERE email = ?;`, [token.email]
        )
        req.user = users[0]
    
        next()
    }
 module.exports = {
     logger,
    isLoggedIn
 }