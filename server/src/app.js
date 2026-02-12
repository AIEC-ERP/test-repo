import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';

import authRoutes from "../src/modules/auth/routes.js";


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Sample endpoint to test the server's health
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});

app.use("/api",authRoutes);

//Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

export default app