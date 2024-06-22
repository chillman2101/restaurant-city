import mongoose from "mongoose";
import dotenv from 'dotenv'


const env = dotenv.config().parsed
const connection = () => {
    mongoose.connect(env.DB_URI,{
        dbName: env.DB_NAME
    })

    const conn = mongoose.connection

    conn.on('error', console.error.bind(console, 'Connection Error !'))
    conn.once('open', () => {
        console.log(`Db Connected Succesfully to ${env.DB_NAME} on port ${env.DB_PORT}`)
    })
}

export default connection