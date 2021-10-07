import mongoose from 'mongoose'
const RuleSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Rule', RuleSchema )
