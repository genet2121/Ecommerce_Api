const dependencies = require("../../../configration/dependance");

const deps = (new dependencies()).getDependencies()

module.exports = {

    authenticate: (roles) => {

        return async (req, res, next) => {
            try {

                if (!req.headers.authorization) {
                    throw deps.exceptionHandling.throwError("Unauthorized! token not found man", 401);
                } else {

                    const token = req.headers.authorization.split(" ")[1];
                    const user = await TokenGenerator.verify(token, deps.appSecretKey);

                    if (!roles.includes(user.user_type)) {
                        throw deps.exceptionHandling.throwError("Unauthorized user! user authorization failed! ", 401);
                    }

                    req.user = user;
                    next();

                }
            } catch (error) {
                if (error.statusCode) {
                    return res.status(error.statusCode).json({ message: error.message });
                } else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
        };
    },

}

