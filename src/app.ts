import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import router from "./app/routes";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to handle plain text requests
app.use(express.text());

// Middleware to parse cookies
app.use(cookieParser());

// CORS setup to allow requests from specific origin with credentials support
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow only this origin for CORS requests
    credentials: true, // Allow cookies to be sent with the request
  })
);

// Basic route to check if the server is running
app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running successfully!");
});

// Routes for the API
app.use("/api/v1", router);

// Middleware for handling 404 errors when no matching route is found
app.use(notFound);

// Global error handler for the application
app.use(globalErrorHandler);

export default app;
