import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(
            "User with id " + req.params.id + " has been deleted..."
        );
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUserByCity = async (req, res) => {
    const city = req.body.city;
    try {
        let users;
        if (city) {
            users = await User.find({ city });
        } else {
            users = await User.find();
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const checkAuthentication = async (req, res, next) => {
    res.status(200).json("You are authenticated");
};

export const getAllUsers = async (req, res, next) => {
    console.log("get all users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
