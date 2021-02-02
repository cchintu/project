const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://cchinmaya3:Cchinmaya3@@cluster0.d6x1z.mongodb.net/Data?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true
}).then(()=>{
    console.log('database connected');
}).catch((e)=>{
    console.log(`error connected:${e}`)
})
