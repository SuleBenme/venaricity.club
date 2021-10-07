import mongoose from 'mongoose'
const TacticsSchema = new mongoose.Schema({
  formation: {
      type: String,
      required: 'Formation required'
  },
  created: {
    type: Date,
    default: new Date()
  },
  gk : [{
    content: { type: String}
  }],
  df: [{
    content: { type: String},
    specific_position: { type: String},
  }],
  cdm: [{
    content: { type: String},
    specific_position: { type: String},
  }],
  cm : [{
    content: { type: String},
    specific_position: { type: String},
  }],
  cam: [{
    content: { type: String},
    specific_position: { type: String},
  }],
  fw: [{
    content: { type: String},
    specific_position: { type: String},
  }], 
})

export default mongoose.model('Tactics', TacticsSchema)
