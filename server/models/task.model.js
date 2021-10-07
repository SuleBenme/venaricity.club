import mongoose from 'mongoose'
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        trim: true,
        //required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    x: {
        type: Number
    },
    y: {
        type: Number
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

export default mongoose.model('Task', TaskSchema)
