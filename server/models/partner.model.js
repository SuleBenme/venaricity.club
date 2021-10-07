import mongoose from 'mongoose'
const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Text is required'
  },
  type: {
    type: String,
    default: "1"
  },
  link: {
    type: String,
  },
  description: {
      type: String,
      required: 'Text required'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  }, 
})

export default mongoose.model('Partner', PartnerSchema)
