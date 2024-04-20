const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/all.configuration");

function authenicationToken(req, res, next) {

    const authHeader = req.header("Authorization");


    if (!authHeader) {
        return res.status(401).json({ message: "UnAuthorized:Missing Token" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    jwt.verify(token,secretKey,(err,data) => {

        if (err) {
            console.log("JWT TOKEN verfiyerror " + err);
            return res.status(401).json({ message: "Not Match Token" }); 
        }

        req.data = data;
        console.log(data);
        next();
    })
}


module.exports = authenicationToken;