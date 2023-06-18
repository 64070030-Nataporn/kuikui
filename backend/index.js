const express = require("express")
const session = require('express-session')
const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
app.use(logger) //run middleware ทุกครั้ง
app.use(cors())

// Statics
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'cute cat',
  resave: false,
  saveUninitialized: true,
}))

// routers
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user');
const bookRouter = require('./routes/book')
const movRouter = require('./routes/movie')
const songRouter = require('./routes/song')
const chatRouter = require('./routes/chat')


app.use(indexRouter.router)
app.use(userRouter.router);
app.use(bookRouter.router)
app.use(movRouter.router)
app.use(songRouter.router)
app.use(chatRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})