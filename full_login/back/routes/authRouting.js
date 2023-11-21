const express =require("express");
const router=express.Router();
const cors=require("cors");
const {test,registerUser,loginUser}=require('../controllers/authControllers') //from controllers ,the logics imported as functions

//middlewares

router.use(
    cors({
        credentials:true,
        origin:"http://localhost:3000"
    })
)

router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports=router   