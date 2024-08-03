import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirecURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamp: true });

const URL = mongoose.model('url', urlSchema)
export { URL }