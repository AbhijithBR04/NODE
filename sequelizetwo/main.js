const express = require('express');
const apiRoutes = require('./route');
const {sequelize, connection} = require('./db');
const body_parser = require('body-parser');

const app = express();
const PORT = 4001;

app.use(express.json());
app.use('/api',apiRoutes);



app.use((req,res)=>{
    res.status(404);
    res.json({message:"Resource not found"});
})


app.use((req,res)=>{
    res.status(500);
    res.json({message:"Oops... Something went wrong"});
})

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello World"})
})

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connection();
})