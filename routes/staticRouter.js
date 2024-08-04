import { Router as expressRouter } from "express";
import { URL } from "../models/urlModel.js";
import { restrictedTo } from "../middlewares/auth.js";

const router = expressRouter();
router.get("/", restrictedTo(["NORMAL", "ADMIN"]), async(req, res) => {
    const allURLs = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        allurl: allURLs,
    });
});
router.get("/admin/urls", restrictedTo(["ADMIN"]), async(req, res) => {
    const allURLs = await URL.find({});
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