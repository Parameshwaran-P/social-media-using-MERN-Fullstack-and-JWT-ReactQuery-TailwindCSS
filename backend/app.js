import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectDatabase from './db/db.js';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDatabase();
})
