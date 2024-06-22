const dependencies = require("../../../configration/dependance");
const TokenGenerator = require("../../../infrastructure/service/authentatication/tokenGenerator");
const Roles = require("../../../models").roles;
const Tables = require("../../../models").table_names; 
const deps = (new dependencies()).getDependencies();

const tokenGenerator = new TokenGenerator();

module.exports = {
    authorize: (action, tableName) => {
        return async (req, res, next) => {
            try {
                console.log("Authenticating request...");
                if (!req.headers.authorization) {
                    console.error("Authorization header missing");
                    throw deps.exceptionHandling.throwError("Unauthorized! Token not found", 401);
                }

                const token = req.headers.authorization.split(" ")[1];
                console.log("Token received:", token);
                const user = await tokenGenerator.verify(token, deps.appSecretKey);
                console.log("User verified:", user);
                console.log("admin admin_type:", user.admin_type_id);

               
                const table = await Tables.findOne({
                    where: {
                        tab_name: tableName
                    }
                });

                if (!table) {
                    console.error("Table not found:", tableName);
                    throw deps.exceptionHandling.throwError(`${tableName} table not found on database`, 404);
                }

                const table_name_id = table.id;
                console.log("Table ID:", table_name_id);
                const roles = await Roles.findAll({
                    where: {
                        admin_type_id: user.admin_type_id,
                        table_name_id: table_name_id
                    }
                });

                if (!roles || roles.length === 0) {
                    console.error("No roles found for user with the specified table_name_id");
                    throw deps.exceptionHandling.throwError("Unauthorized user!", 401);
                }

                const hasPermission = roles.some(role => role[action]);
                if (!hasPermission) {
                    console.error(`User does not have permission to ${action} on table_name_id ${table_name_id}`);
                    throw deps.exceptionHandling.throwError("Unauthorized user!", 401);
                }

                req.user = user;
                next();
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
