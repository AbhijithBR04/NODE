const express=require('express');
const mysql=require('mysql');
const app=express()
app.use(express.json())

const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Password123#@!",
    database:"seqdata"
})

con.connect((err)=>{
    if(err){
        console.log("error sql",err);
    }else{
        console.log("connected");
    }
})

app.post('/register',(req,res)=>{
    const name=req.body.name;
    const id=req.body.id
    const mark=req.body.mark;

    con.query('INSERT INTO mytable VALUES(?,?,?)',[id,name,mark],(err,result)=>{
        if(err){
            console.log("****err",err)
        }else(
            res.send("registered")
        )
    })

})

app.put('/update/:id',(req,res)=>{
    const upid=req.params.id
    const name=req.body.name;
    const mark=req.body.mark;

    con.query('UPDATE mytable SET name=?,mark=? WHERE id=? ',[name, mark, upid],(err,result)=>{
        if(err){
            console.log("***err",err);
        }else{
            if(result.affectedRows==0){
                res.send("id not present")
            }else{
                res.send("Updated")
            }
        }
    })

})


app.get('/fetch',(req,res)=>{
    con.query('SELECT * FROM mytable',(err,result,fields)=>{
        if(err){
            console.log("*****err",err);
        }else{
            res.send(result)
            console.log(result);
        }
    })
})


app.delete('/delete',(req,res)=>{
    const delid=req.body.id;
    con.query("DELETE FROM mytable WHERE id=?",delid,(err,result)=>{
        if(err){
            console.log("***err",err);
        }else{
            if(result.affectedRows==0){
                res.send("id not present")
            }else{
                res.send("Deleted")
            }
        }
    })
})

app.listen(4000,()=>{
    console.log("port connecetd")
})