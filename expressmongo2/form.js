const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/form") //testdb=database name in robo3t
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("***error while connecting", err);
  });

const User = mongoose.model("User", {
  name: String,
  age: Number,
  gender: String,
  state: String,
  img: ({
    data: Buffer,
    contentType: String,
  })
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded());

//for entering a new data...POST request
app.post("/page-post", (req, res) => {
  const userData = new User();
  userData.name = req.body.name;
  userData.age = req.body.age;
  userData.gender = req.body.gender;
  userData.state = req.body.state;

  userData
    .save()
    .then((data) => {
      console.log("use data saved", data);
    })
    .catch((err) => {
      console.log("error while saving data".err);
    });

  res.send("post request done ");
});

//to update an existing data....PUT request
app.put("/page-put", (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then((userData) => {
      userData.name = req.body.name;
      userData.age = req.body.age;
      userData.gender = req.body.gender;
      userData.state = req.body.state;

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

//for deleting a data on mongoDB
app.delete("/page-delete", (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then((userData) => {
      userData
        .deleteOne()
        .then((deletedData) => {
          console.log("deleted data", deletedData);
        })
        .catch((err) => {
          console.log("error", err);
        });
    })
    .catch((err) => {
      console.log("id not found", err);
    });
  res.send("Data Deleted");
});

app.post("/page", (req, res) => {
  console.log("body data", req.body);
  // res.send("get request body parser")
  res.send(req.body);
  res.write(req.body);
});









app.listen(5001);
