import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import authRoutes from "../src/modules/auth/routes.js";


const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],
  credentials: true,
//   preflightContinue: false 
}));

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