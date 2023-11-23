const express =require("express");
const validator = require('express-joi-validation').createValidator({})
const router=express.Router();
const cors=require("cors");
const Joi = require('joi')
const jwt=require("jsonwebtoken")
const JWT_SECRET= "figfifsfiiuoefueuiruw4y387gewwg"
const User=require('../models/user')

const {test,registerUser,loginUser,updateUser}=require('../controllers/authControllers') //from controllers ,the logics imported as functions

//middlewares

router.use(
    cors({
        credentials:true,
        origin:"http://localhost:3000"
    })
)
const registerSchema=Joi.object(
    {
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }
)

const authmiddleware = async function(req, res, next) {
    const token = req.body.token;
    console.log(token);
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log(decodedToken);
      const userData = await User.findById(decodedToken.id);
    //    console.log(userData);
      if (!userData) {
        res.status(404).json({ message: "User not found" });
      }
       else {
        // res.status(200).json({ message: "Verification successful", user: userData });
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Token is invalid or expired" });
    }
   
}


router.get('/',test)
router.post('/register',validator.body(registerSchema),registerUser)
router.post('/login',loginUser)
router.post('/update',authmiddleware,updateUser)

module.exports=router   