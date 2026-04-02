const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://shreyanshkr7206:<db_password>@account.6qekycy.mongodb.net/?appName=Account");

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  flat: String,
  area: String,
  landmark: String,
  pincode: String,
  city: String,
  state: String,
  time: Number
});

const User = mongoose.model("User", userSchema);

app.post("/save", async (req, res) => {
  await User.create(req.body);
  res.send("Saved");
});

app.listen(3000, () => {
  console.log("Server running");
});
