import { Router as expressRouter } from 'express'
import { URL } from '../models/urlModel.js'

const router = expressRouter()
router.get('/', async(req, res) => {
    const allURLs = await URL.find({})
    return res.render('home', {
        allurl: allURLs
    })
})
export { router as staticRouter }