const userModel = require('../schema/user.schema');
const checkUserIsExits = require('../model/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../configuration/all.configuration');


const singup = async (req, res) => {

    const {name,email,password} = req.body;
    const hasePassword = await bcrypt.hash(password,10);
    
    const exitsUSer = await checkUserIsExits(req.body.email);

    if (exitsUSer) {
        return res.status(400).json({ message: 'User already exist', ok: false });
    }
    else {
        try {
            const savedata = await userModel.create({name,email,password:hasePassword});
            return res.status(200).json({ message: savedata, ok: true });
        }
        catch (error) {
            res.send(error);
        }
    }

}

const login = async (req, res) => {
    try {
        const user = await checkUserIsExits(req.body.email);

        if (!user) {
            return res.status(400).json({ message: 'User Not found' });
        }

        const isPasswordvalid = await bcrypt.compare(req.body.password,user.password)

        if (!isPasswordvalid) {
            return res.status(400).json({ message: "Password incorrect" });
        }

        data = {
            userid: user._id,
            email: req.body.email,
            name: user.name,
        }

        const token = jwt.sign(data,secretKey,{ expiresIn: '1h' });

        return res.status(200).json({data,token,message: 'Sigin Suceesfully' });

    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}


const getUserById = async(req,res) => {

    try {
       
        const userid = req.data.userid;
        const user = await userModel.findById(userid);

        if(!user)
        {
            res.status(400).json("user not fond");

        }

        res.json(user);
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error);
    }

}

const User_Deatils = async(req,res) =>{

    try
    {
        let data = await userModel.find();
        res.status(200).json({"message":data,"ok":true})
    }
    catch(error)
    {
        console.log(error);
    }

}


module.exports = { singup, login,getUserById,User_Deatils};
