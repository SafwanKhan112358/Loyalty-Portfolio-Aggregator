require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

const {hashPass, comparePass} = require("./utils/hash");
const authToken = require("./middleware/authToken");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=>{
    //res.send("Route works!");
    const result = await pool.query('SELECT * FROM "Testing"');
    res.json(result.rows);
});

app.get("/profile", authToken, async (req,res)=>{
    try{
        const result = await pool.query("SELECT name, email FROM users WHERE userid = $1", [req.user.userid]);
        res.status(200).json({
            name: result.rows[0].name,
            email: result.rows[0].email
        });
    } catch(error){
        res.status(500).json({message: "An error occurred"});
    }
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

app.post("/login", async (req,res)=>{
    try{
        const {email, password} = req.body;

        const result = await pool.query("SELECT userid, name, email, password FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0){
            return res.status(401).json({message: "Incorrect email"});
        }

        const user = result.rows[0];
        
        const validPass = await comparePass(password, user.password);
        if (!validPass){
            return res.status(401).json({message: "Incorrect password"});
        }

        const token = jwt.sign(
            {userid: user.userid},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            token: token,
            user: {
                userid: user.userid,
                name: user.name,
                email: user.email
            }
        });

    }catch(error){
        res.status(500).json({message: "An error occurred in login"});
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started");
});



