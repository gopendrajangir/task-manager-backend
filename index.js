import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

dotenv.config({ path: "./.env" });

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoutes);
app.use("/tasks", taskRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);

  const user = process.env.MONGO_USER;
  const password = process.env.MONGO_PASS;

  mongoose
    .connect(
      `mongodb+srv://${user}:${password}@cluster0.hjzyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/task-manager`
    )
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("Error while connecting to database");
    });
});
