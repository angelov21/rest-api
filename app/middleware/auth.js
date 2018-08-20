const STATUS_CODES = require('../constants/status-codes');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./private.pem', 'utf8');

module.exports = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, privateKey, { algorithm: "HS256" }, err => {
            if (err) { 
                res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "Not Authorized" });
            }
            
            return next();
        });
    } else {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ error: "Not Authorized" });
    }
}