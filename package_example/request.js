const axios = require('axios')

axios.get('http://www.google.com')
     .then(res => {
         console.log(res)
     })
     .catch(err => {
         console.log(err)
     })
     .then(()=>{
         console.log('ALL DONE,  regardless if request successeded or failed');
     })

  
