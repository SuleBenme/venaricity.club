import mongoose from 'mongoose'
const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  description: {
    type: String,
    required: 'Description is required'
  },
  users: [{
    teamName: String,
    byUser: {type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Post'}],
  messages: [{
    text: String,
    date: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  date: {
    type: String,
    required: 'Date is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
})

export default mongoose.model('Tournament', TournamentSchema)
