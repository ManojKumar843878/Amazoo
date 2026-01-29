const express= require('express');
const router =express.Router();

const {createOrders} = require('../controllers/orderController')

router.route('/order').post(createOrders);

module.exports=router;