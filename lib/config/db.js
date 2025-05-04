import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect("your db link");
  console.log("DB connected !");
};
