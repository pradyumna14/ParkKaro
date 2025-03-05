const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { CarRepository } = require("../repositories");

const CarRepo= new CarRepository();

const getAllCars = async () => {
  try {
    const cars = await CarRepo.getAll();
    return cars;
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const addCar= async (maker,models) => {
    try {
        const car = await CarRepo.addNewCar({ maker, models });
        return car;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAllBrands = async () => {
    try {
        const brands = await CarRepo.getAllBrands();
        return brands;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getAllModelsByBrandId = async (id) => {
    try {
        const models = await CarRepo.getAllModelsByBrandId(id);
        return models;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    getAllCars,
    addCar,
    getAllBrands,
    getAllModelsByBrandId
}