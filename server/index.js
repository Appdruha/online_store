require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

