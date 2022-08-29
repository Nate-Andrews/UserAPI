require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose
    .connect(process.env.db_URL, 
    { useNewUrlParser: true })
    .then(console.log('Database Comnnected'))
    .catch(error => console.error(error))

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:3000",
        method: ["GET", "POST", "PATCH", "DELETE"]
    })
)

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(8080, () => console.log("server has started"))