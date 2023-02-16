const express= require('express')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const app=express()
const router=express.Router()
const port=3000
const checkJwt=require('./auth')
const User = require ('./models').userData
app.use(bodyParser.json())
app.use(express.static("C:/Users/DC/Desktop/JWT System"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/login',(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/JWT System/html/login.html")
})

app.get('/register',(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/JWT System/html/register.html")
})
app.get('/anasayfa',(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/JWT System/html/anasayfa.html")
})

app.post('/register',(req,res)=>{
    User.create({name:req.body.kname,surname:req.body.surName,email:req.body.email,password:req.body.password})
    .then(user=>res.sendFile("C:/Users/DC/Desktop/JWT System/html/login.html")).catch(e=>console.log(e))
})


router.post('/login', function(req,res,next){
        let email=req.body.email
        let password=req.body.password
 User.findAll().then(users=>{
    for(let i=0;i<users.length;i++){
      
       if(email== users[i].email && password== users[i].password){
        const {email}=req.body.email
        const {password}=req.body.password
        const token=jwt.sign({
            email:email,
            password:password,
            exp:Math.floor(Date.now()/1000)+60
         }, 'secretKey')
        console.log(token)
        res.sendFile("C:/Users/DC/Desktop/JWT System/html/anasayfa.html")
        break;
       }else{
        req.body.tik="Şifre veya Mail adresiniz Hatalı!"
        console.log("Hatalı")
       }
    }
  })
  .catch(e=>console.log(e))


 
})
router.post('/posts',checkJwt, function(req,res,next){
    res.send('<h2>Selam Babuş</h2>')
})
router.get('/', function(req,res,next){
    res.send("Çalışıyorum...")
})


app.use('/',router)

app.listen(port, function(){
    console.log(`localhost:${port} online...`)
})
