import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dallERoutes from "./routes/dallERoutes.js";

dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dallERoutes);

app.get('/', async (req, res)=> {
    res.send('Hello URV');
})

console.log(process.env.OPENAI_API_KEY)

const startServer = async ()=> { 

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen( 8080, ()=> console.log('Server running at port 8080'));
    } catch(error) {
        console.log(error);
    }

    
}

startServer(); 