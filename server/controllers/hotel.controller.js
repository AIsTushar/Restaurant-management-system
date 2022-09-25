import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    console.log(newHotel);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(
            "Hotel with id " + req.params.id + " has been deleted..."
        );
    } catch (error) {
        next(error);
    }
};

export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const getHotelByCity = async (req, res) => {
    const city = req.body.city;
    console.log(city);
    try {
        let hotels;
        if (city) {
            hotels = await Hotel.find({ city });
        } else {
            hotels = await Hotel.find();
        }
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
};

//  "_id": "62e8d632213b166c4ec605a8",
//         "name": "Hotel One",
//         "type": "hotel",
//         "city": "Dhaka",
//         "address": "7/4",
//         "distance": "500m",
//         "photos": [],
//         "title": "Best hotel in dhaka",
//         "desc": "Hotel Description",
//         "rooms": [],
//         "cheapestPrice": 100,
//         "featured": false,

export const getUniqueCityInHotails = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        const cities = hotels.map((hotel) => hotel.city);
        const uniqueCities = [...new Set(cities)];
        res.status(200).json(uniqueCities);
    } catch (error) {
        next(error);
    }
};

export const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
};
