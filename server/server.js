import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import app from "./src/app.js";
import "./src/config/dbconfig.js";

const PORT = process.env.PORT;

const startServer = async () =>{
    try {
        app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();