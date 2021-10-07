import mongoose from 'mongoose'
const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    //required: 'Text is required'
  },
  description: {
    type: String,
    //required: 'Text is required'
  },
  content: {
      type: String,
      //required: 'Text required'
  },
  date: {
    type: String,
    default: new Date()
  },
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
})

export default mongoose.model('News', NewsSchema)
