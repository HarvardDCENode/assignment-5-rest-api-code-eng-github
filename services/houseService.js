const House = require('../schemas/houses.mongo')

class HouseService {
    static async list() {
        return House.find();
    }

    static async get(id) {
        return House.findById(id);
    }

    static async create(house) {
        const newHouse = new House(house);
        return newHouse.save();
    }

    static async save(house) {
        return house.save();
    }

    static async delete(id) {
        const house = await House.findById(id);
        if(house === null) {
            return null;
        }

        return house.deleteOne();
    }
}

module.exports = HouseService;