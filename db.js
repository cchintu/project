const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/excel",{useUnifiedTopology:true,useNewUrlParser:true
}).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(`error connected:${e}`)
})