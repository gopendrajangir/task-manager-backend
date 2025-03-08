import Product from "../models/Product.js";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://jangirnishu:3fNGigw7teGn0cwX@cluster0.xqeuoo6.mongodb.net/task-manager"
  )
  .then(() => {
    console.log("database connected");
    Product.deleteMany().then(() => {
      console.log("Data Deleted");
    });
  })
  .catch(() => {
    console.log("error while connecting to database");
  });
