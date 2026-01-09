import express, { response } from "express";
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import userRouter from "./routes/useRoute.js";
import resumeRouter from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoutes.js";


//database connection
await connectDB()
const app = express ();
const PORT = process.env.PORT || 5000;

app.use (express.json())
app.use(cors())


app.get('/',(req,res)=>res.send("Server is live.......!"))
app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)

//start server

app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})