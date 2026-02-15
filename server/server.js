import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import app from "./src/app.js";
import "./src/config/dbconfig.js";

const PORT = process.env.PORT;

// const startServer = async () =>{
//     try {
//         app.listen(PORT,()=>{
//         console.log(`Server is running on port ${PORT}`);
//         })
//     } catch (error) {
//         console.error('Failed to start server:', error.message);
//         process.exit(1);
//     }
// }

const startServer = () => {
    // app.listen does not return a promise, so await is not needed here
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
};

startServer();