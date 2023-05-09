import mongoose from "mongoose";
import env from 'dotenv'

env.config()

let db: string = ''

if (typeof process.env.DB === 'string')
  {
    db = process.env.DB
}



export default async function database() {
    try {
        await mongoose.connect(db).then(() => console.log('DB connection successfull.')).catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}