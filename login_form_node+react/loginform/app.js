const express = require("express")
const collection = require("./mongo")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            await collection.insertMany({email,password})
            res.json("notexist")
        }

    }
    catch(e){
      console.error(e);
      res.status(500).json("fail");
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})
