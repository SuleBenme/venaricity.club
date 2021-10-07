import mongoose from 'mongoose'
const ReportSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        trim: true,
        //required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    //postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Report', ReportSchema)