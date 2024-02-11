const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser =  asyncHandler(async (req,res) => {
    const {username,email,password} = req.body;

    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userAvailable = await User.findOne({email});

    if(userAvailable)
    {
        res.status(400)
        throw new Error("User already registered...!")  
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password,10)
    console.log("hash password : " ,hashPassword)

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    })

    console.log(`user created ${user}`)

    if(user)
    {
        res.status(201).json({_id: user.id, email: user.email})
    }
    else
    {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message: "Register the user"})
})

// @desc login user
// @route POST /api/users/login
// @access public
const loginUser =  asyncHandler(async (req,res) => {
    res.json({message: "login user"})
})

// @desc current user info
// @route GET /api/users/current
// @access public
const currentUser =  asyncHandler(async (req,res) => {
    res.json({message: "current user information"})
})


module.exports = {registerUser,loginUser,currentUser}