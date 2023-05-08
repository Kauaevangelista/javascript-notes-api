import mongoose from "mongoose";

const mongoURI = 'mongodb+srv://admin:M9XjKbRyorpGvTrM@cluster0.xjiuazr.mongodb.net/?retryWrites=true&w=majority'

export default async function connectToMongoDB() {
    try {
        await mongoose.connect(mongoURI!)

        console.log('Conectado ao banco')
    } catch (error) {
        console.log(error)
    }
}