const dependencies = require("../../../configration/dependance");
const TokenGenerator = require("../../../infrastructure/service/authentatication/tokenGenerator");
const deps = (new dependencies()).getDependencies()

const tokenGenerator = new TokenGenerator(); 
module.exports = {
    authenticate: (roles) => {
        return async (req, res, next) => {
            try {           
                console.log("Authenticating request...");
                if (!req.headers.authorization) {
                    console.error("Authorization header missing");
                    throw deps.exceptionHandling.throwError("Unauthorized! token not found man", 401);
                } else {
                    const token = req.headers.authorization.split(" ")[1];
                    console.log("Token received:", token);
                    const user = await tokenGenerator.verify(token, deps.appSecretKey);
                    console.log("User verified:", user);
                    console.log("User user_type:", user.user_type);

                    if (!roles.includes(user.user_type)) {
                        console.error("User role unauthorized:", user.user_type);
                        throw deps.exceptionHandling.throwError("Unauthorized user!", 401);
                    }

                    req.user = user;
                    next();
                }
            } catch (error) {
                console.error("Authentication error:", error);
                if (error.statusCode) {
                    return res.status(error.statusCode).json({ message: error.message });
                } else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        };
    }
};