import cron from 'cron'
import axios from 'axios'
import Fifa21 from '../models/fifa21.model'
import extend from 'lodash/extend'
import Player from '../models/player.model'
import errorHandler from './../helpers/dbErrorHandler'

let config = {
    headers: {
      'Referer': 'https://www.ea.com/',
    }
}
const statsId = '5f95cfe926264a05706d6a4f'

const list = async (req, res) => {
  try {
    let stats = await Fifa21.findById(statsId).select()
    res.json(stats)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const onSuccess = async (teamStats, members, memberStats, recent_matches) => {
    let fifa21 = await Fifa21.findById(statsId).exec()
    if (!fifa21){return console.log("Error")}
    console.log(recent_matches)
    let Stats = { teamStats: teamStats, members: members, memberStats: memberStats, recent_matches: recent_matches}

    let algo = fifa21
    algo = extend(fifa21, Stats)

    try {
        let result = await algo.save()
        console.log(result)
        //res.json(result)
      }catch (err){
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
}


const prueba = new cron.CronJob('*/30 * * * *', async function() {
  await axios.all([
    axios.get('https://proclubs.ea.com/api/fifa/clubs/seasonalStats?platform=ps4&clubIds=1505518', config),
    axios.get('https://proclubs.ea.com/api/fifa/members/career/stats?platform=ps4&clubId=1505518', config),
    axios.get('https://proclubs.ea.com/api/fifa/members/stats?platform=ps4&clubId=1505518', config),
    axios.get('https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4&clubIds=1505518', config)])
    .then(axios.spread((teamStats, members, memberStats, recent_matches)  => {
      //console.log(recent_matches)
      onSuccess(teamStats.data[0], members.data, memberStats.data, recent_matches.data)
  })) 
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  console.log('Function executed!')
}, null, true);


const canAddPlayers = async (req, res) => {
  let fifa21 = await Fifa21.findById(statsId).exec()
  let players = await Player.find()

  if (!fifa21 || !players ){return console.log("Error")}

  let players_can_add = []

  fifa21.members.members.map((player)=> {
    let playerFound = false;

    for(let i = 0; i < players.length; i++){
      if(players[i].name.toLowerCase() === player.name.toLowerCase()){
        playerFound = true
        break;
      }
    }
    if(!playerFound){players_can_add.push(player)}
  })

  try {
    res.json(players_can_add)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const createPlayer = async (req, res) => {
  let newPlayer = {
    name: req.body.name,
    generalPosition: req.body.favoritePosition,
    role: 1 // academy
  }
  try {
    let create_player = new Player(newPlayer)
    let result =  await create_player.save()
    res.status(200).json(result)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const addPlayers = async (req, res) => {
  const players = req.body

  players.map(async (player)=> {
      console.log(player)
      let newPlayer = {
          name: player.name,
          generalPosition: player.favoritePosition
      }
      console.log(newPlayer)
      let create_player = new Player(newPlayer)

      try {
        let result =  await create_player.save()
        console.log(result)
      } catch (err) {
        console.log(errorHandler.getErrorMessage(err))
      }
  })
}

const update_players_stats = async () => {
  let stats = await Fifa21.findById(statsId).select()
  let players = await Player.find()

  for(let i = 0; i < stats.memberStats.members.length; i++) {
    for(let j = 0; j < players.length; j++) {
      if (stats.memberStats.members[i].name.toLowerCase() == players[j].name.toLowerCase()){
        let player = players[j]
        player.stats = stats.memberStats.members[i]
        await player.save()
      }
    }
  }
}

const update_players = new cron.CronJob('0 1 * * *', async function() {
  update_players_stats()
}, null, true);

export default {list, addPlayers, canAddPlayers, createPlayer}