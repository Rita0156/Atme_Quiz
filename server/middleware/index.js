require("dotenv").config()
var jwt = require('jsonwebtoken');
const authentication = (req, res, next) => {
    if(!req.headers.authorization){
        res.json("signup first");
    }
    
    const token = req.headers.authorization.split(" ")[1];
    
    jwt.verify(token, process.env.SECREATE_KEY, function (err, decoded) {
        if (err) {
            // Check for specific JWT errors
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token provided" });
            }
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired" });
            }
            // Generic error response
            return res.status(401).json({ message: "Token verification failed", error: err });
        }

        // Token is valid, proceed to next middleware
        next();
    });
}

module.exports = {
    authentication
}