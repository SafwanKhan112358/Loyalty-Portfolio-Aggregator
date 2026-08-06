require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const {hashPass, comparePass} = require("./utils/hash");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=>{
    //res.send("Route works!");
    const result = await pool.query('SELECT * FROM "Testing"');
    res.json(result.rows);
});

app.post("/signup", async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json({message: "At least 1 of the fields has not been entered"});
        }
        const emailResult = await pool.query("SELECT email FROM users WHERE email = $1", [email]);
        if (emailResult.rows.length !== 0){
            return res.status(400).json({message: "Email already exists"});
        }

        const hashedPass = await hashPass(password);

        const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING userid,name,email",[name, email, hashedPass]);

        res.status(201).json(result.rows[0]);
    }catch(error){
        res.status(500).json({message: "An Error Occurred In Signup"});
    }

});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started");
});



