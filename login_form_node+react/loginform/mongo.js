const mongoose = require('mongoose');
mongoose
  .connect("mongodb://127.0.0.1:27017/loginform") //loginform=database name in robo3t
  .then(() => console.log("Connected!")).catch(() => console.log("error connecting"));

  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });

const collection = mongoose.model("collection", UserSchema);
module.exports = collection