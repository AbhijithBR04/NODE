const express = require("express");
const multer  = require('multer')

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
  image:{ type: String},
});

app.use(bodyParser.urlencoded());
const User = mongoose.model("User", UserSchema);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }) //const upload = multer('uploads/') will only store a converted value ,storage is used to store the exact file


const authmiddleware = async function(req, res, next) {
  const token = req.body.token;
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userData = await User.findById(decodedToken.id);

    if (!userData) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Verification successful", user: userData });
    }
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
  next();
};


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


app.post("/login-post",upload.single ('image'),async (req, res) => {           //formdata storing in database,use upload.single for file upload
    try {
      const userData = new User();
      const hash = await bcrypt.hash(req.body.password, 10);
      console.log(req.file);
      userData.name = req.body.name;
      userData.password = hash;
      userData.role = req.body.role;
      userData.image=req.file.path  //image is the formdata key or the user model key ... file.path is the loaction of the image on uploads folder
  
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

app.post("/logged-post",async (req, res) => {
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
      res.status(200).json({token,user:user._id,name:user.name});
    } else {
      res.status(400).json({ message: "Failed" });
    }
  } catch (err) {
    res.status(400).json({ message: "error occurred" });
  }
});


app.post("/verify", async (req, res) => {
  const token = req.body.token;
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userData = await User.findById(decodedToken.id);

    if (!userData) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Verification successful", user: userData });
    }
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
});

// app.get("/protected", authmiddleware, (req, res) => {
//   res.json({ message: "Access granted", user: req.user });
// });


app.listen(5000, () => {
  console.log("port running");
});





