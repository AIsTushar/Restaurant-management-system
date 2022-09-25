import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    console.log("register", req.body);
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        await user.save();
        res.status(200).send("User Created");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    console.log("login", req.body);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new Error("404 User not found"));
        }
        const isPasswordCurrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCurrect) {
            return next(new Error("401 Password does not match"));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        const { password, ...other } = user._doc;
        // console.log({ ...other, token });

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .send({ ...other, token });
    } catch (err) {
        res(err);
    }
};

export const userProfile = async (req, res, next) => {
    console.log("userProfile", req.user);

    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return next(new Error("404 User not found"));
        }
        res.status(200).send(user);
    } catch (err) {
        res(err);
    }
};

export const updateUser = async (req, res, next) => {
    // console.log("updateUser", req.user);

    // userData = req.body without password
    const { token, ...userData } = req.body;

    // console.log("updateUser", userData);

    if (req.body._id === req.user.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                const saltRounds = 10;
                req.body.password = await bcrypt.hash(
                    req.body.password,
                    saltRounds
                );
            } catch (err) {
                return next(err);
            }
        }
        try {
            console.log("updateUser", userData);
            const user = await User.findByIdAndUpdate(
                req.body._id,
                { $set: userData },
                { new: true }
            );
            res.status(200).send(user);
        } catch (err) {
            res(err);
        }
    } else {
        res.status(403).send("You can update only your account");
    }
};
