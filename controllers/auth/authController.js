const models = require("../../models");
const deps = require("../../configration/dependance");

module.exports = class AuthController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }

    async login({ email, password }) {
        try {
            let user = await models.users.findOne({
                where: {
                    email: email
                },
                attributes: ["id", 'email', "passwrd"]
            });

            if (!user.dataValues) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }

            console.log("found user ", user.dataValues);
            
            const verifyPassword = await this.dependencies.encryption.compare(password, user.dataValues.passwrd);

            if (!verifyPassword) {
                throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
            } else {

                const token = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey);
                return {
                    token,
                    ...user.dataValues
                };

            }

        } catch (error) {
            console.log(error);
            if (error.statusCode) {
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            } else {
                throw this.dependencies.exceptionHandling.throwError(error.message, 500);
            }
        }
    }

    async logOut() {
        // Log out logic if needed
    }

}
