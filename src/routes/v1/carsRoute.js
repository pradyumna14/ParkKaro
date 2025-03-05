const express = require('express');
const router = express.Router();
const {CarController} = require('../../controllers');

router.get('/get', CarController.getAllCars);
router.post('/', CarController.addCar);
router.get('/brands', CarController.getAllBrands);
router.get('/models/:id', CarController.getAllModelsByBrandId);

module.exports = router;