import express from "express";
import path from "path";
import { connectMongoDB } from "./connection.js";
import { Router } from "./routes/urlRoutes.js";
import { staticRouter } from "./routes/staticRouter.js";
import { userRouter } from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { checkForAuthentication, restrictedTo } from "./middlewares/auth.js";

dotenv.config();
const app = express();

//Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Mongodb
connectMongoDB(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connection Sucsessful"))
    .catch((err) => console.log("Error in monogodb connection", err));

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);

//Routes
app.use("/url", restrictedTo(["NORMAL,ADMIN"]), Router);
app.use("/user", userRouter);
app.use("/", staticRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is running on port number ${PORT}`));