import mongoose from 'mongoose'
const HistorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name required'
  },
  content: {
    type: String,
    required: 'Description required'
  },
  created: {
    type: Date,
    default: new Date()
  },
  image: {
    type: String
  },
})

export default mongoose.model('History', HistorySchema)
