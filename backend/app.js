import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectDatabase from './db/db.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use("/api/auth", authRoutes)

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