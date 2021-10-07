import mongoose from 'mongoose'
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Text is required'
  },
  role: {
    type: String,
    default: "1"
  },
  role_description: {
    type: String,
  },
  generalPosition: {
      type: String,
      required: 'Text required'
  },
  specificPosition: [{
      type:String,
  }],
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  kitNumber: {
    type: String,
  },
  country: {
    type: Object,
  },
  stats: {
    type: Object
  }
})

export default mongoose.model('Player', PlayerSchema)
