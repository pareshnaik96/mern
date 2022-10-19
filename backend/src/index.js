const express = require("express")
const app = express()
const cors = require("cors")


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//=================================================================//
            //==  mongoDB connection ==//
//=================================================================//          
const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://pareshnaik:W536yetBeRCk0yL8@cluster0.m9yz9.mongodb.net/MERN-DB?retryWrites=true&w=majority",{
    useNewUrlParser: true
}).then(()=>{
    console.log("MongoDB is connected")
}).catch((err)=>{
    console.log(err)
})

const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:String,
    repassword:String
})

const userModel = new mongoose.model("User",userSchema )

//=================================================================//
            //==  API ==//
//=================================================================//    

app.get("/",(req,res)=>{
    res.send("App is running")
})

app.post("/register",(req,res)=>{
    console.log(req.body)
    const {firstname,lastname,email,password,repassword} = req.body
    userModel.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"This email id is already Register"})
        }else{
            const user = new userModel({
                firstname,
                lastname,
                email,
                password,
                repassword
            })
            user.save();
            res.send({message:"Successfully Register"})
        }
    })
})

app.post("/login",(req,res)=>{
   console.log(req.body)

   const {email,password} = req.body
   
   userModel.findOne({email:email},(err,user)=>{
    if(!user) res.send({message:"please enter required field"})
    if(user){
        if(password === user.password){
           res.send({message:"Login Successfull",user})
        }else{
            res.send({message:"password didn't match"})
        }
    }else{
        res.send({message:"This email id is not register"})
    }
   })
})


app.listen(4000,()=>{
    console.log("server is running on port 4000")
})
