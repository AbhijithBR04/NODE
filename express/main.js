const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/test") //test=database name in robo3t
  .then(() => console.log("Connected!"));

const User = mongoose.model("User", { name: String, age: Number });

app.use(bodyParser.urlencoded());

app.post("/page-post", (req, res) => {
  const userData = new User();
  userData.name = req.body.name;
  userData.age = req.body.age;
  userData
    .save()
    .then((data) => {
      console.log("data", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
  res.send("you have submitted");
});

app.put("/page-put", (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then((userData) => {
      userData.name = req.body.name;
   
      userData.age = req.body.age;

      userData
        .save()
        .then((savedData) => {
          console.log("updated data", savedData);
        })
        .catch((err) => {
          console.log("error", err);
        });
    })
    .catch((err) => {
      console.log("id not found", err);
    });
  console.log("bodydata", req.body);
  res.send(req.body);
});
app.use(bodyParser.urlencoded());



app.post("/page", (req, res) => {
  console.log("body data", req.body);
  // res.send("get request body parser")
  res.send(req.body);
  res.write(req.body);
});

app.get("/", (req, res) => {
  // console.log("home")
  res.send(`
        <h1> hello <h1/> 
        <form action="/result" method="POST">
            <input type="text">
            <button>submit</button>
        <form/>
    `);
});

app.get("/page", (req, res) => {
  res.send("you have submitted");
});

app.delete("/delete", (req, res) => {
  // console.log("delete route")
  res.send("the delete route").status;
});

app.listen(4000);
