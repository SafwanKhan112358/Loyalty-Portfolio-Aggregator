const express = require("express");
const pool = require("../db");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.get("/dashboard", authToken, async (req,res) =>{

    try{
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

        let userProgramsData = userPrograms.map((program) => {

            if(program["type"] === null){
                program["type"] = "cash native";
            }

            if(program["points"] !== null){
                program["points"] = Number(program["points"]);
            }

            program["dollar_value"] = Number(program["dollar_value"]);

            return program;
        });

        
        userProgramsData = userProgramsData.reduce((acc, row)=>{

            let {parent_category, ...program} = row;
            
            if (parent_category === null){
                parent_category = "Gift Cards";
            }

            if (!acc[parent_category]){
                acc[parent_category] = {
                    name: parent_category,
                    total: 0,
                    programs: []  
                };
            }

            acc[parent_category]["total"] += program["dollar_value"];
            acc[parent_category]["programs"].push(program);

            return acc;
        },{});

        userProgramsData = Object.values(userProgramsData);

        const total = userProgramsData.reduce((acc,row)=>{
            return acc + row["total"];
        },0.00);
        
        res.status(200).json({
            user: userName,
            total,
            parentCategories: userProgramsData
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "An error occurred in dashboard"
        });
    }
});

module.exports = router;
