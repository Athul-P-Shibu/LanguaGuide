const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/userData"; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  country: String,
  age: Number,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Endpoint to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email, phone, country, age } = req.body;

  try {
    const newUser = new User({ name, email, phone, country, age });
    await newUser.save();
    res.status(201).send("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send("Error saving data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
