const express = require('express')
const customerRouter = require('./customer')
const router = express.Router()

router.get('/', (req, res) => {

    return res.send('working nice');

});

router.use('/', customerRouter)
module.exports = router