const express = require('express')
const customerRouter = require('./api/customer/customer')
const router = express.Router()

router.get('/', (req, res) => {

    return res.json({mensagem: 'testes'});

});

router.use('/customer', customerRouter)

router.use()