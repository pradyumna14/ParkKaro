const express =require('express');
const router =express.Router();

const HomeRoute =require('./homeRoute');
const AuthRoute =require('./authRoute');
const CarRoute = require('./carsRoute');

router.use('/',HomeRoute);
router.use('/auth',AuthRoute);
router.use('/cars',CarRoute);


module.exports=router;