const express = require('express');
const router = express.Router();
const { customer } = require('../models');


router.get('/customer', async (req, res) => {
    try {
      const customerResponse = await customer.findAll();
      res.json(customerResponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving customer data");
    }
  });
 


router.post('/customer', async (req, res) => {
  try {
    const { Name, SecondName } = req.body;
    await customer.create({ Name, SecondName });
    res.send('New user added with success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
