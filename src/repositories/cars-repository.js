const CrudRepositery = require("./crud-repository");
const { Car } = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");


class CarRepository extends CrudRepositery {
    constructor() {
        super(Car);
    }
    async getAllBrands() {
        try {
            return await Car.distinct('maker');
        } catch (error) {
            throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllModelsByBrandId(brandId) {
        try {
            const cars=await Car.find({ maker: brandId });
            return cars.length?cars[0].models:"No Brand found with Name "+brandId;
        } catch (error) {
            throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async addNewCar(car) {
        try {
        
            const existingBrand = await Car.findOne({ maker: car.maker });
            if (existingBrand) {
                let updatedCar = existingBrand;
        
                // Use Promise.all to handle multiple asynchronous operations
                await Promise.all(car.models.map(async (model) => {
                    const existingModel = await Car.findOne({
                        maker: car.maker,
                        models: { $elemMatch: { model_name: model.model_name } }
                    });
        
                    if (!existingModel) {
                        updatedCar = await Car.findOneAndUpdate(
                            { maker: car.maker },
                            { $push: { models: model } },
                            { new: true } // Return the updated document
                        );
                    }
                }));
        
                return updatedCar;
            }
        
            // Create a new car if the brand does not exist
            return await Car.create(car);
        } catch (error) {
            throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
module.exports = CarRepository;