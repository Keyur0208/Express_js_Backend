const userModel = require('../schema/user.schema');

const checkUserIsExits = async(email)=>{
    try
    {
        const result = await userModel.findOne({email});
        return result;
    }
    catch (error)
    {
        return null;
    }
}

module.exports = checkUserIsExits;
