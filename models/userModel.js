import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,

    },
    email: {
        required: true,
        type: String,
        unique: true

    },
    password: {
        required: true,
        type: String,

    },
    role: {
        required: true,
        type: String
    }
}, { timestamps: { required: true } })

const User = mongoose.model('user', userSchema)
export { User }