import express from "express";
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import adminRouter from './routes/admin.js'
import connection from "./connection.js";

const env = dotenv.config().parsed


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//router auth
app.use('/auth',authRouter)
app.use('/admin',adminRouter)

//handling error
app.use((req,res) => {
    res.status(404).json({
        message:"URL NOT FOUND"
    })
})

//connection mongo db
connection()


app.listen(env.APP_PORT, ()=> {
    console.log(`server started on port ${env.APP_PORT}`)
})