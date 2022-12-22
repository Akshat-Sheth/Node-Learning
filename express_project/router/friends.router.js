const express = require('express')
const { getAllFriends, getFriendbyId, postFriend } = require('../controllers/friends.controller')
const friendsRouter = express.Router()


// we can also apply custom middlewaare so that it just works for that particular router
//  that is in this case the  friends router
friendsRouter.use((req,res,next) => {
    console.log(req.ip)
    next();
})

friendsRouter.get('/', getAllFriends)
friendsRouter.post('/', postFriend)
friendsRouter.get('/:id', getFriendbyId )


module.exports = friendsRouter