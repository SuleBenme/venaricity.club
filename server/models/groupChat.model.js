import mongoose from 'mongoose'
const GroupChat = new mongoose.Schema({
  comments: [{
    text: String,
    date: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('GroupChat', GroupChat)
