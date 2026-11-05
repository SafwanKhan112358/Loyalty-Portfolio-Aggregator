const express = require("express");
const pool = require("../db");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.get("/dashboard", authToken, async (req,res) =>{
    const {userid} = req.user;

    let userName = await pool.query(
        `SELECT name
        FROM users
        WHERE userid = $1
        `,
        [userid]);
    
    userName = userName.rows;

    let userPrograms = await pool.query(
        `SELECT DISTINCT ON(up.program_id) 
        up.id, 
        COALESCE(p.name,up.custom_name) AS name, 
        p.parent_category, p.category, 
        p.type, b.points, COALESCE(b.dollar_value,0.00) AS dollar_value
        FROM user_programs up
        LEFT JOIN balances b ON up.id = b.user_program_id
        LEFT JOIN programs p ON up.program_id = p.id
        WHERE user_id = $1
        ORDER BY up.program_id, b.recorded_at DESC, b.id DESC
        `, 
        [userid]);

    userPrograms = userPrograms.rows;

    res.status(200).json({userName, userPrograms});
});

module.exports = router;
