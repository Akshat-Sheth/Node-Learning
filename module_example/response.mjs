function decrypt(data){
    return 'decrypted data'
}

function read(){
    return decrypt('data')
}


//  if we use commonJS module
// module.exports = {
//     read
// }

// If we use ECMA script module
export {
    read
}