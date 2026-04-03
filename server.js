const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  flat: String,
  area: String,
  landmark: String,
  pincode: String,
  city: String,
  state: String
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Save API
app.post("/save", async (req, res) => {
  try {
    const data = new User(req.body);
    await data.save();
    res.json({ success: true, message: "Data Saved" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
