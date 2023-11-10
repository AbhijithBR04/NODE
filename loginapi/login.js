const express=require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/logindb")               //logindb=database name in robo3t
  .then(() => console.log("DataBase Connected!"));

const User = mongoose.model("User", { name: String,email:String,password:String});
const Todo=mongoose.model("Todo",{title:String,status:Number,userID:String})
app.use(bodyParser.urlencoded());

//to add the login users
app.post("/page-postlogin", (req, res) => {
    const userData = new User();
    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.password = req.body.password;
    userData.save().then((data) => {
        console.log("data", data);
      }).catch((err) => {
        console.log("error", err);
      });
    res.send("you have submitted login data");
  });
  

  //to post the todos of login users 
  app.post("/page-posttodo", (req, res) => {
    const todoData= new Todo();
    todoData.title = req.body.title;
    todoData.status = req.body.status;
    todoData.userID = req.body.userID;
    todoData.save().then((todosdata) => {
        console.log("todosdata", todosdata);
      }).catch((err) => {
        console.log("error", err);
      });
    res.send("you have submitted todo data");
  });

//to get all the todos of a specific user :- give a id from login to postman in post("/page-gettodo")
  app.post("/page-gettodo", (req, res) => {
    const userID = req.body.id;
    Todo.find({userID}).then((todoData) => {
        res.send(todoData); 
      }).catch((err) => {
        console.log("id not found", err);
      });
  });


  //to get all the todos 
  app.get("/gettodo", (req, res) => {
    const userID = req.body.id;
    Todo.find(userID).then((todoData) => {
        res.send(todoData); 
      }).catch((err) => {
        console.log("id not found", err);
      });
  });



app.listen(4000,()=>{
    console.log("port running")
})