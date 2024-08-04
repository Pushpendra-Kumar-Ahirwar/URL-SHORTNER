import { URL } from "../models/urlModel.js";
import { nanoid } from "nanoid";

async function handleGeneratShortUrl(req, res) {
    const shortid = nanoid(8);
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ msg: "Url in required" });
    }
    URL.create({
        shortId: shortid,
        redirecURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", {
        id: shortid,
    });
}

async function handleGetRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: true,
            },
        },
    });
    res.redirect(entry.redirecURL);
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json({
        totolClicks: entry.visitHistory.length,
        alalytics: entry.visitHistory,
    });
}

export { handleGeneratShortUrl, handleGetRedirectUrl, handleAnalytics };