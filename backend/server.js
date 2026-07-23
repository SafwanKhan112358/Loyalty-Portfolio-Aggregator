require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=>{
    //res.send("Route works!");
    const result = await pool.query("SELECT * FROM Testing");
    res.json(result.rows);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started");
});



