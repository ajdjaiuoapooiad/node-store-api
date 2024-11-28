const express = require('express')
const router = express.Router()
const {getAllstatic,getAllProducts} = require('../controllers/products')


router.route('/').get(getAllProducts)
router.route('/static').get(getAllstatic)


module.exports = router;