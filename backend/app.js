import express from 'express';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import postRoutes from './routes/postRoute.js'
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from 'cookie-parser';
import connectDatabase from './db/db.js';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

connectDatabase()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        
    })
})

.catch((error)=>{
console.log("Failed to connect to the database",error.message);
process.exit(1)
})