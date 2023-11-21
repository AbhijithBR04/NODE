const express =require("express");
const validator = require('express-joi-validation').createValidator({})
const router=express.Router();
const cors=require("cors");
const {test,registerUser,loginUser,registerSchema}=require('../controllers/authControllers') //from controllers ,the logics imported as functions

//middlewares

router.use(
    cors({
        credentials:true,
        origin:"http://localhost:3000"
    })
)

router.get('/',test)
router.post('/register',validator.body(registerSchema),registerUser)
router.post('/login',loginUser)

module.exports=router   