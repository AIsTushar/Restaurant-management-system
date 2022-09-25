import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log(req.cookies.access_token, process.env.JWT_SECRET);

    const token = req.cookies.access_token || req.headers["token"];
    if (!token) {
        return res.status(403).send("You are not authenticated");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send(err.message);
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
 
    const token = req.cookies.access_token || req.headers["token"] || req.body.token;
       console.log("x token", token);


    if (!token) {
        return res.status(403).send("You are not authenticated");
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).send(err.message);
            }
            req.user = user;
            next();
        });
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        console.log("HERE", req.user);
        if (!req.user.isAdmin) {
            res.status(403).send("You are not allowed to perform this action");
        } else {
            next();
        }
    });
};
