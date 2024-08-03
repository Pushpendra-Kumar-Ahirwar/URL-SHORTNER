import { getUser } from "../services/auth.js";

async function restrictedUserLogin(req, res, next) {
    try {
        const userUid = req.cookies ? req.cookies.uid : null;
        // const userUid = req.headers["authorization"]
        if (!userUid) {
            if (!res.headersSent) {
                return res.redirect("/login");
            }
        }
        // const token = userUid.split('Bearer ')[1] //For the mobile device auth
        const user = getUser(userUid);
        if (!user) {
            console.log("No user found with the given UID");
            if (!res.headersSent) {
                return res.redirect("/login");
            }
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictedUserLogin middleware:", error);
        if (!res.headersSent) {
            res.redirect("/login");
        }
    }
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies ? req.cookies.uid : null;
    // const userUid = req.headers["authorization"]
    // const token = userUid.split('Bearer ')[1]
    const user = getUser(userUid);
    req.user = user;
    next();
}

export { restrictedUserLogin, checkAuth };