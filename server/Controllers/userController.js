const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey,{expiresIn: "3d"});
}
const registerUser = async(req,res)=>{
    try
    {
    const {name, email, password}=req.body

    let user =  await userModel.findOne({email});

    if(user) return res.status(400).json("User with email is already exist");
    if(!name || !email || !password) return res.status(400).json("All fields are required!");
    if(!validator.isEmail(email)) return res.status(400).json("Email format is not valid");
    if(!validator.isStrongPassword(password)) return res.status(400).json("Passwod must ne strong!");

    user = new userModel({name,email,password})
    //ma hoa pw (10 la muon ma hoa thanh bao nhieu ky tu)
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = createToken(user._id)

    res.status(200).json({_id: user._id, name, email, token})
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};
const userLogin = async (req,res) =>
{
    const {email, password} = req.body;
    try{
        let user =  await userModel.findOne({email});
        if (!user) 
            return res.status(400).json("Invalid username or password");
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) 
            return res.status(400).json("Invalid email or password");
        const token = createToken(user._id);

        res.status(200).json({_id:user._id,name:user.name, email, token});

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//find user by id
const findUser = async (req,res)=>{
    const userId  = req.params.userId;
    try{
        const user = await userModel.findById(userId);
        
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//get list user
const getUser = async (req,res)=>{
    try{
        const user = await userModel.find();
        res.status(200).json(user)
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = {registerUser, userLogin, findUser, getUser};