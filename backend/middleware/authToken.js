const jwt = require("jsonwebtoken");

function authToken(req, res, next){
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message: "Auth header does not exist"});
    }

    const token = authHeader.split(" ")[1];
    if (!token){
        return res.status(401).json({message: "Invalid token format"});
    }

    try{
        const validToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validToken;
        next();
    } catch(error){
        res.status(401).json({message: "Invalid or expired token"});
    }
}

module.exports = authToken;