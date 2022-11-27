const express = require('express')
const app = express()
const sequelize = require('./models/index').sequelize
const Router = require('./routes/index')
const useragent = require('express-useragent');
const cors = require('cors')




const drive = async () => {
    try {
        await sequelize.sync({ force: false })
        console.log('DATABSE CONNECTED!!')
    } catch (err) {
        console.log('DATABSE CONNECT FAIL!!')
        return;
    }
}
drive()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(useragent.express());


app.use('/v1/api', Router)

const allowCors = ['http://localhost:8080']
app.use(cors({
    origin: allowCors,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))

const port = 3000
app.listen(port, () => {
    console.log(`${port}PORT CONNECTED!!`)
})