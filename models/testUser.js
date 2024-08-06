import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
}, { timestamps: { required: true } })

const TestUser = mongoose.model('TestUser', userSchema)

export { TestUser }