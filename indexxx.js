import express, { json } from 'express'
import mongoose from 'mongoose'
import { TestUser } from './models/testUser.js'
import path from 'path'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { User } from './models/userModel.js'

const PORT = 3000
const app = express()
    //ejs
app.set('view engine', 'ejs')
app.set("views", path.resolve("./views"));

//Token generatin
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        name: user.name
    }, 'Pushpendra')
}

async function getUser(token) {
    if (!token) return null
    try {
        const decode = jwt.verify(token, "Pushpendra")
        return decode

    } catch (error) {
        console.log("token not match")
        return null

    }
}

async function checkForAuthentication(req, res, next) {
    const userToken = await req.cookies ? req.cookies.token : null
    if (!userToken) return res.redirect('/login');
    const user = await getUser(userToken)
    if (!user) return res.redirect('/login');
    req.user = user
    return next()

}
//Mongodb connection
mongoose.connect('mongodb://localhost:27017/test-auth').then(() => console.log("Mongo db connection sucsecfull"))
    .catch(() => console.log("error in mongodb connection"));

//Middlewares
app.use(json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
    // app.use(checkForAuthentication)

//Routes

app.get('/', checkForAuthentication, async(req, res) => {
    const users = await TestUser.find({})
    return res.render('user', {
        users
    })
})

app.post('/signup', async(req, res) => {
    const { name, email, password } = req.body
    const user = await TestUser.create({
        name,
        email,
        password
    })
    if (!user) {
        return res.json({ "msg": "problem in signup" })
    }
    return res.redirect('./login')
})

app.post('/login', async(req, res) => {
    const { email, password } = req.body
    const user = await TestUser.findOne({ email, password })
    if (!user) {
        return res.redirect('/login')
    }
    const token = setUser(user)
    res.cookie('token', token)
    res.redirect('/')
})

//Statics routes
app.get('/login', (req, res) => {
    return res.render('login')
})
app.get('/signup', (req, res) => {
    return res.render('signup')
})

app.listen(PORT, () => console.log("App is running on port ", PORT))