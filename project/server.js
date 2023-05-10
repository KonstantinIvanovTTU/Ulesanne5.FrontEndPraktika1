const express = require('express')
const projectRoutes = require('./routes/routes_project.js')
const sequelize = require('./config/db.config')
const app = express()
const PORT = process.env.PORT || 8000

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use('/api', projectRoutes)

async function start() {
    try {
        //await sequelize.sync()
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
}

start()