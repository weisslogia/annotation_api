import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/connect";
import User from './routes/user.route';
import Security from './routes/security.route';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({limit: "50mb"}))

app.use('/api/v1/user', User);
app.use('/api/v1/security', Security);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL || "");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
