import jwt from "jsonwebtoken";
// const sessionIDToUserMap = new Map() // using for the cookies

function setUser(user) {
    return jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.SECRET, { expiresIn: "1h" }
    );
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (error) {
        return console.log("token not match");
    }
}

export { setUser, getUser };