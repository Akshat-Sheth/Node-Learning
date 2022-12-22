function encrypt(data){
    return 'Encrypted data'
}

function send(url,data){
    const encryptedData = encrypt(data)
    console.log(`Sending ${encryptedData} to the server`)
}


// if we use commonJS module
// module.exports = {
//     send:send
// }

// if we use ECMA Script module
export  {
    send
}