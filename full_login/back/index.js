const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors")
const mongoose =require("mongoose")
const cookieParser=require("cookie-parser")
const app=express();



mongoose
  .connect("mongodb://127.0.0.1:27017/fulllogin")
  .then(() => console.log("DataBase Connected"))
  .catch((err)=>console.log("DataBase Not Connected",err));

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use('/',require('./routes/authRouting'))


app.listen(8000,()=>{
    console.log("server running")
})