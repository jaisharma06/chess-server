Mongoose = require('mongoose')
Schema = Mongoose.Schema

 PlayerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    displayName: {type: String, required: true},
    profilePicUrl: String,
    joinedDate: {type: Date, required: true}
 })
    
 PlayerModel = Mongoose.model("players", PlayerSchema)
    
class Player {

    static addPlayer = async function (req, res) {
        var reqBody = req.body
        console.log("=------------", reqBody, "-----------------=")
        var data = { firstName: reqBody.firstName, lastName: reqBody.lastName, username: reqBody.username, password: reqBody.password, displayName: reqBody.displayName, profilePicUrl: reqBody.profilePicUrl, joinedDate: Date.now() }
        
        PlayerModel.create(data, (err, playerData) => {
            if (err) {
                 console.log(err)
                res.status(404).json({ status: false, data: {}, error: err })
            } else {
                console.log("success:", playerData)
                res.status(200).json({ status: true, data: playerData })
            }
        })
    }

    static getPlayer = async function (req, res) {
        var playerToken = { username: req.body.username, password: req.body.password }
        console.log(playerToken)
        PlayerModel.findOne(playerToken, (err, doc) => {
            if (err) {
                res.status(404).json({ status: false, data: {}, error: err })
            } else{
                res.status(200).json({status: true, data: doc})
            }
        })
    }

    static updatePlayerDetails = function (firstName, lastName, username,  password, displayName, profilePicUrl) {
        var updatedPlayerDetails = {
                firstName: firstName,
                lastName: lastName,
                password: password,
                displayName: displayName,
                profilePicUrl: profilePicUrl
            }
        PlayerModel.findOneAndUpdate({ username: username, password: password }, updatedPlayerDetails, { upsert: true }, (err, playerDetails) => {
            if (err) {
                console.log(err)
                return null
            }

            console.log(playerDetails)
            return playerDetails
        })

        return null
    }

    static deletePlayer = function (username, password) {
        
    }
}

module.exports = PlayerSchema
module.exports = PlayerModel
module.exports = Player