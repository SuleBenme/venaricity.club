import mongoose from 'mongoose'
const Fifa21Schema = new mongoose.Schema({
    teamStats: {
        type: Object,
    },
    members:  {
        type: Object
    },
    memberStats: {
        type: Object
    },
    recent_matches: {
        type: Array
    }
})

export default mongoose.model('Fifa21', Fifa21Schema)
