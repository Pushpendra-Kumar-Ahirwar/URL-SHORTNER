import { User } from "../models/userModel.js";
import { setUser } from "../services/auth.js";

async function handleUserSignup(req, res) {
    const { email, name, password, role } = req.body;
    await User.create({
        email,
        password,
        name,
        role,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            msg: "Invalid email or password",
        });
    }
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
    // return res.json({ token })  for the mobile device
}

export { handleUserSignup, handleUserLogin };