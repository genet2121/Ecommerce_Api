
const models = require("../../models");

module.exports = class AdminAuthController {

    dependencies;

    constructor(deps){
        this.dependencies = deps;
    }

    async login({ email, password }) {
        try {
            let admin = await models.admins.findOne({
                where: {
                    email: email
                },
                attributes: ["id", 'email', "passwrd"]
            });

            if (!admin) {
                throw this.dependencies.exceptionHandling.throwError("Admin not found", 404);
            }

            admin.dataValues.user_type = 'admin'; 

            console.log("found admin ", admin.dataValues);
            
            const verifyPassword = await this.dependencies.encryption.compare(password, admin.dataValues.passwrd);

            if (!verifyPassword) {
                throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
            } else {
                const token = this.dependencies.tokenGenerator.generate(admin.dataValues, this.dependencies.appSecretKey);
                return {
                    token,
                    ...admin.dataValues
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
        
    }

}

