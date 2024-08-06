import express, { json } from 'express'
import multer from 'multer'
import path from 'path'
const app = express()

//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(json())
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        const filename = `${Date.now()} - ${file.originalname}`
        cb(null, filename)
    }
})
const upload = multer({ storage })

//Routes
app.post('/upload', upload.single('profilePhoto'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.redirect('/')
})
app.get('/', (req, res, next) => {
    res.render('images')
})

app.listen(3000, () => console.log('App is running'))