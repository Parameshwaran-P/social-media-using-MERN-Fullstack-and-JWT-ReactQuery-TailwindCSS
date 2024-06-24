import jwt from "jsonwebtoken";

export const generateTokenandsetCookie = (userId, res) =>{
 
 try {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
    
  }
  const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"14d"})

  res.cookie("jwt", token, {
    maxAge: 14*24*60*60*1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  })
 } catch (error) {
  console.log("Error generating token", error.message)
  res.status(500).json({ error: "Internal Server Error" })
 }
  
}