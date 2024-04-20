const jwt = require('jsonwebtoken');
const secretKey = require('../configuration/jwt.configuration');


const generteRefershToken=(user)=>{

    const payload = {
        id:user._id,
        email:user.email,
        name:user.name
    }

    return jwt.sign(payload,secretKey,{expiresIn:"7h"});
}

const verfyToken=(token)=>{
   return jwt.verify(token,secretKey)
}

module.exports = {generteToken,generteRefershToken,verfyToken};
