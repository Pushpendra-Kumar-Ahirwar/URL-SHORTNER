import { Router as expressRouter } from 'express'
import { handleGeneratShortUrl, handleGetRedirectUrl, handleAnalytics } from '../controllers/urlController.js'

const router = expressRouter()

router.post('/', handleGeneratShortUrl)
router.get('/:shortId', handleGetRedirectUrl)
router.get('/analytics/:shortId', handleAnalytics)

export { router as Router }