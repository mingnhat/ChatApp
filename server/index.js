const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")
const app = express()
require("dotenv").config()//config doc bien tu file env

//middle layer
app.use(express.json()) //allow to use json data (send n receive)
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/chats",chatRoute)
app.use("/api/messages",messageRoute)

app.get("/",(req,res)=>{
    res.send("Welcome chat app APIs")
})
const port = process.env.PORT || 5010;
const uri = process.env.ATLAS_URI;

app.listen(port, (req,res) =>{
    console.log(`Running on port...: ${port}`)
})
//connect to mongodb
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>console.log("MongoDB connection established")).catch((error)=>console.log("MongoDB connection failed:  ",error.message));