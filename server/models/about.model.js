import mongoose from 'mongoose'
const AboutSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('About', AboutSchema )
