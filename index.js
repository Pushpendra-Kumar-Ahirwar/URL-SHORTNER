import express from "express";
import ejs from 'ejs'
import path from 'path'
import { connectMongoDB } from "./connection.js";
import { Router } from "./routes/urlRoutes.js";
import { staticRouter } from "./routes/staticRouter.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

//Ejs
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


//Mongodb
connectMongoDB(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connection Sucsessful"))
    .catch((err) => console.log("Error in monogodb connection", err));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/url", Router);
app.use('/', staticRouter)
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
    console.log(`App is running on port number ${PORT}`)
);