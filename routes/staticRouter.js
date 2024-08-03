import { Router as expressRouter } from "express";
import { URL } from "../models/urlModel.js";

const router = expressRouter();
router.get("/", async(req, res) => {
    if (!req.user) return res.redirect('/login')
    const allURLs = await URL.find({ createdBy: req.user._id })
    return res.render("home", {
        allurl: allURLs,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});
export { router as staticRouter };