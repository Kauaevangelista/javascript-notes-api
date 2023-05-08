import mongoose from "mongoose";
mongoose.Promise = global.Promise

// const mongoURI = 'mongodb+srv://admin:M9XjKbRyorpGvTrM@cluster0.xjiuazr.mongodb.net/?retryWrites=true&w=majority'

export default async function connectToMongoDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/javascript-notes').then(() => console.log('Conectado ao banco de dados')).catch((err) => console.log(err))
    } catch (error) {
        console.log(error)
    }
}