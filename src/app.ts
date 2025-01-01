import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import router from "./app/routes";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running successfully!");
});

app.use("/api/v1", router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
