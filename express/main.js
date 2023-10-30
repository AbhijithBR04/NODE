const express=require("express")
const app=express()

app.get("/",(req,res)=>{
    // console.log("home")
    res.send(`
        <h1> hello <h1/> 
        <form action="/result" method="POST">
            <input type="text">
            <button>submit</button>
        <form/>
    `)
})

app.post("/result",(req,res)=>{
    res.send("you have submitted")
})

app.get("/about",(req,res)=>{
    // console.log("about route")
    res.send("the about route")
})

app.delete("/delete",(req,res)=>{
    // console.log("delete route")
    res.send("the delete route").status(400)
})
 
 
app.listen(4000)