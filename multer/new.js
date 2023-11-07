const express=require("express")
const multer = require("multer");
const app=express();

// app.use(express.json());executes the middleware on every request made to our server.
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.array("files"),uploadFiles);
function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files)
    res.send({message:"success"})
}


app.listen(4001,()=>{
    console.log("ok")
})