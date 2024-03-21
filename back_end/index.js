const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const usersRoutes = require("./routes/users")

const app = express()



dotenv.config();

const uri = process.env.MONGO_URL;

mongoose.connect(uri).then(() => {
    console.log("Successfully connected to db")
}).catch(err => { console.log(err) })

app.use(cors())
app.use(express.json())

app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to development backend" })
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running")
})