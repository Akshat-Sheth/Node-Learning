const path = require('path')


function getMessages (req,res) {
    // this sendFile function needs the full path of the file g=from the root of our machine 
    //  so to solve this issue we make use of the nibuilt path module
    // __dirname is tyhe variable in the nodes global method to get the location of the filder where the current file lives
    const absolutePath = path.join(  __dirname , '..', 'public','images', 'skimountain.jpeg')
    res.sendFile(absolutePath)
}

module.exports = {
    getMessages
}