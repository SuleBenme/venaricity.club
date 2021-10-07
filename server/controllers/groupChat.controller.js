import GroupChat from '../models/groupChat.model'
import errorHandler from './../helpers/dbErrorHandler'
import Tournament from '../models/tournament.model'

const comment = async (req, res) => {
    console.log(req.body)
    let comment = req.body.comment
   
    try{
      let result = await Tournament.findByIdAndUpdate(req.body.tournamentId, {$push: {messages: comment}}, {new: true})
      .populate('messages.postedBy', '_id name')
      .exec()
      console.log(result)
      res.json(result)
    }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const list = async (req, res) => {
    console.log(req.body)
    /*
    try {
      let messages = await GroupChat.find().select()
      res.json(messages)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }*/
}


export default {
    comment, 
    list,
}
