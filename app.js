const  express = require('express');
const app= express();
const port = process.env.PORT||3000;
const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json')
const xlsxtojson = require('xlsx-to-json'); 

const ejs = require('ejs');

require("./db");


const User=require("./model")



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');


app.get('/',(req,res)=>{
    const user = User.find({},(err,data)=>{
        if(err)
        console.log(err)
        console.log(data);
        res.render("home",{users:data});
    });
           
})
app.get('/upload',(req,res)=>{
    res.render('upload');
})
 
global.__basedir = __dirname;

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__basedir+'/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+"-"+file.originalname)
    }
})

const upload = multer({storage:storage});



app.post('/uploadfile',upload.single("sheetfile"),async(req,res)=>{
    
   
    let excel2json;
    if(req.file.originalname.split('.')[ req.file.originalname.split('.').length-1]==='xlsx'){
        excel2json=xlsxtojson;
    }
    res.redirect('/');
    excel2json({
        input:req.file.path,
        
        lowerCaseHeaders:true
    },async(err,res)=>{
        if(err)
        {console.log(err)}
        else
        {
            
            console.log(res[0]);
            for(var i=0;i<res.length;i++)
               {
                   const user1 = new User({
                       Name:res[i].Name,
                       Roll_no:res[i].Roll_no,
                       Class:res[i].Class
                   })
                  await user1.save();
               }
              
               
        }
       
    })
});


app.listen(port,(req,res)=>{
    console.log(`listening to port ${port}`);
})
