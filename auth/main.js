const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const jwtSecret='ec83e7a2d3fcc799fd0a486c16fb7c27b91f8e8a64b836bae0d298b9338da358fd8e5c'

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/authDB")
  .then(() => console.log("DataBase Connected"));

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, minlength: 6, required: true },
  role: { type: String, required: true },
});

app.use(bodyParser.urlencoded());
const User = mongoose.model("User", UserSchema);

// app.post("/login-post", (req, res) => {
//   userData = new User();
//   bcrypt.hash(req.body.password, 10).then(async (hash) => {
//     (userData.name = req.body.name),
//       (userData.password = hash),
//       (userData.role = req.body.role);

//     userData
//       .save()
//       .then((data) => {
//         console.log("data", data);
//       })
//       .catch((err) => {
//         console.log("error", err);
//       });
//     res.send("you have submitted login data");
//   });
// });


app.post("/login-post", async (req, res) => {
    try {
      const userData = new User();
      const hash = await bcrypt.hash(req.body.password, 10);
  
      userData.name = req.body.name;
      userData.password = hash;
      userData.role = req.body.role;
  
      const savedData = await userData.save();
      console.log("data", savedData);
  
      res.send("you have submitted login data");
    } catch (err) {
      console.log("error", err);
      res.status(500).send("Internal Server Error");
    }
  });
  

// app.post("/logged-post",async(req,res)=>{
//     const {name,password}=req.body;
//     if(!name || !password){
//         return res.send("not found")}
//     try{
//         const user=await User.findOne({name})
//         if(!user){
//             res.status(400).json({message:"failed"})

//         }else{
//             bcrypt.compare(password,user.password).then((result)=>{
//             result?res.status(200).json({message:"sucess"}):res.status(400).json({message:"Failed"})
//             })
//     }
//     }catch(err){
//         res.status(400).json({message:"error occured"})
//     }
// })

app.post("/logged-post", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.send("not found");
  }
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "failed" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
        const maxAge=3*60*60;
        const token=jwt.sign({ id: user._id,name, role: user.role },
            jwtSecret,{expiresIn: maxAge,})
      res.status(200).json({token});
    } else {
      res.status(400).json({ message: "Failed" });
    }
  } catch (err) {
    res.status(400).json({ message: "error occurred" });
  }
});

app.listen(5000, () => {
  console.log("port running");
});
