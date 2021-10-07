import Tournament from '../models/tournament.model'
import errorHandler from './../helpers/dbErrorHandler'
import extend from 'lodash/extend'
import stripe from 'stripe'
import config from './../../config/config'
import GroupChat from '../models/groupChat.model'

const myStripe = stripe(config.stripe_test_secret_key)

const confirmPayment = async (req, res) => {
  //console.log("Confirm payment in the server")
  //console.log(req.body)
  const paymentType = req.body.payment_type

  if (paymentType == "stripe"){
    const clientid = req.body.payment_id

    myStripe.paymentIntents.retrieve(
      clientid,
      async function(err, paymentIntent){

        if(err){
          console.log(err)
        }

        if(paymentIntent.status === 'succeeded'){
          console.log("confirmed stripe payment: " + clientid)
          await Tournament.findByIdAndUpdate(req.body.tournamentId, {$push: {users: req.body.participant}}) 
          res.status(200).json({success: true})
        }
        else{
          res.json({success: false})
          
        }
      }
    )
  }


}
const create = async (req, res) => {
    const tournament = new Tournament(req.body)
    try {
      let result = await tournament.save()
      //console.log(newTournament)
     // let groupChat = await new GroupChat().save()
      //console.log(groupChat)
      ///await Tournament.findByIdAndUpdate(newTournament._id, {$push: {groupChat: groupChat._id}}) 
      
      return res.status(200).json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const list = async (req, res) => {
    try {
      let tournaments = await Tournament.find().select()
      res.json(tournaments)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const listNextTournament = async (req, res) => {
  try {
    let tournaments = await Tournament.find()
    res.json(tournaments[0])
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
    try {
      let id = req.body.tournamentId
      let tournament = await Tournament.findById(id).exec()
      if (!tournament)
      return res.status('400').json({
        error: "Tournament not found"
      })
      let deletedTournament = await tournament.remove()
      res.json(deletedTournament)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}

const addParticipant = async (req, res) => {
  console.log(req.body)
  try{
    await Tournament.findByIdAndUpdate(req.body.tournamentId, {$push: {users: req.body.participant}}) 
    console.log(req.body);
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const tournamentByID = async (req, res, next, id) => {
  try {
    let tournament = await Tournament.findById(id)
    .populate('users.byUser', '_id name photo')
    .populate('comments')
    .populate('messages.postedBy', '_id name photo')
    .populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'comments.postedBy' }
    })
    .populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'postedBy' }
    })
    .sort('-created')
    .exec()

    if (!tournament)
      return res.status('400').json({
        error: "Tournament not found"
      })
    req.tournament = tournament
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve tournament"
    })
  }
}

const read = (req, res) => {
  return res.json(req.tournament)
}

const prueba = async (req, res, next) =>  {
  console.log(req.tournament)
  const paymentIntent = await myStripe.paymentIntents.create({
    amount: 1099*100,
    currency: 'nok',
    payment_method_types: ['card'],
    receipt_email: 'sule.ben.a.1999a@gmail.com',
    statement_descriptor: 'Custom descriptor',
  });
  console.log(paymentIntent)
  return res.json({client_secret: paymentIntent.client_secret, payment_id: paymentIntent.id});
}

export default {
    create, 
    list,
    remove,
    addParticipant,
    tournamentByID,
    read,
    prueba,
    confirmPayment
}