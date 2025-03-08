import Product from "../models/Product.js";
import data from "./data.json" assert { type: "json" };
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://jangirnishu:3fNGigw7teGn0cwX@cluster0.xqeuoo6.mongodb.net/task-manager"
  )
  .then(() => {
    console.log("database connected");
    Product.insertMany(data).then(() => {
      console.log("Data inserted");
    });
  })
  .catch(() => {
    console.log("error while connecting to database");
  });
