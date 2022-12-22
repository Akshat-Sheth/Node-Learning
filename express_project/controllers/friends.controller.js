const model = require('../model/friends.model')

function getAllFriends  (req,res)  {
    res.json(model)
}

function getFriendbyId (req,res) {
    const friendId = Number(req.params.id);
    const friend = model[friendId];
    if(friend){
        res.status(200).json(friend)
    }else{
        res.status(404).json({
            err:'Friend does not exist'
        })
    }
    
}

function postFriend (req,res) {

    if(!req.body.name){
        return res.status(400).json({
            error:'missing friend name'
        })
    }

    const newFriend = {
        id: model.length,
        name : req.body.name
    }
    model.push(newFriend)
    res.status(200).json(newFriend)
}




module.exports = {
    getAllFriends,
    getFriendbyId,
    postFriend
}