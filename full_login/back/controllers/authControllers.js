const bcrypt=require("bcrypt")
const User=require('../models/user') ///data from models schema and things
const jwt=require("jsonwebtoken")
const JWT_SECRET= "figfifsfiiuoefueuiruw4y387gewwg"

const test = (req, res) => {
    res.json("fine");
};



async function hash(password){
    return await bcrypt.hash(password,10)
}

async function comparePassword(password,hashed){
    return await bcrypt.compare(password,hashed)
}

//for registering
const registerUser= async(req,res)=>{
        try {
            const{name,email,password}=req.body;
            if(!name){
                return res.json({
                    error:"Name is required"
                })
            }
            if(!password || password.length<6){
                return res.json({
                    error:"Password required and should be atleast 6 characters"
                })
            }
            const exist =await User.findOne({email}) //check email is already given
            if (exist){
                res.json({
                    error:"Email already in use"
                })
            }
            const hashed=await hash(password)
            const user=await User.create({          //data enters db
                name,email,password:hashed
            })
            res.json(user)
        } catch (error) {
            console.log("****error",error)
        }
}

//for logging
const loginUser= async(req,res)=>{
        try {
            const {email,password}=req.body
            const user=await User.findOne({email})
            if(!user){
                res.json({
                    error:"No user found"
                })
            }   
           const match= await comparePassword(password,user.password)
           if(match){
            jwt.sign({email:user.email,id:user._id,name:user.name},JWT_SECRET,{},(err,token)=>{
                if(err) throw(err);
                res.cookie("token",token).json({user,token})
            })
           }
           if(!match){
            res.json({error:"password dont match"})
           }
        } catch (error) {
            console.log(error)
        }
}


const updateUser =async(req,res)=>{

    const {name,id}=req.body
     const user=  await User.findById(id)
     if (user){
        user.name=name
        await user.save()
        res.status(200).json({message:"The name is updated"})
     }
     else {
        res.status(404).json("user not found")
     }
}



module.exports = {
    test,
    registerUser,
    loginUser,
    updateUser
};
