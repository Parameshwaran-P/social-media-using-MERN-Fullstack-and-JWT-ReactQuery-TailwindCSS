
import {generateTokenandsetCookie} from "../library/utils/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res)=>{


    try {
        const {username, password, email, fullName} = req.body;
        
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)){
           return res.status(400).json({error: "Invalid email format"});
        }
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({error: "Username already exists"});
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error: "Email already exists"});
        }

        if(password.length<6){
            return res.status(400).json({error: "Password must be atleast 6 characters"});
        }
//create hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenandsetCookie(newUser._id,res)
            await newUser.save();
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profilePic: newUser.profilePic,
                coverImg: newUser.coverImg,

            });
        } else {
            return res.status(500).json({error: "Invalid user data"});
        }

        
    } catch (error) {
        console.log("Error in signup", error.message);
        return res.status(500).json({error:"Internal server error"});
    }
       
    }

    export const login = async (req, res)=>{
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username})
            const ispasswordCorrect = await bcrypt.compare(password, user?.password||"")
            if(!user || !ispasswordCorrect){
               return res.status(400).json({error: "Invalid username or password"});
            }
            generateTokenandsetCookie(user._id,res)
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profilePic: user.profilePic,
                coverImg: user.coverImg,
            })
        } catch (error) {
        console.log("Error in LOGIN", error.message);
        return res.status(500).json({error:"Internal server error"});
        }
    }

    export const logout = async (req, res)=>{
       try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})    
       } catch (error) {
        console.log("Error in LOGOUT", error.message);
        return res.status(500).json({error:"Internal server error"});
       }
    }