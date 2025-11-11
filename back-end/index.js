import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import complaintsRoutes from './routes/ComplainRoutes.js';
import newsRoutes from './routes/CurrentnewsRoutes.js';
import assignRoutes from './routes/AssignComplaintRoutes.js';

dotenv.config();

const app=express();

const PORT=8000;

app.use(express.json());

app.use(cors());


app.use('/api/user',userRoutes)

app.use('/api/complaint',complaintsRoutes)

app.use('/api/news',newsRoutes)

app.use('/api/assignComplaint',assignRoutes)

app.use('/uploads',express.static('uploads'))

await connectDB()

app.listen(PORT,()=>{
    console.log('server is running on port 8000')
})