const models = require("../../models");

const { sendEmail } = require('../../utils/mailer');
const { generateVerificationToken } = require('../../utils/token');

module.exports = class AuthController {

    dependencies;

    constructor(deps) {
        this.dependencies = deps;

    }
    async login({ email, password }) {
        try {
            let user = await models.users.findOne({
                where: {
                    email: email
                },
                attributes: ["id", 'email', "password", "admin_type_id"]
            });

            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }

            const verifyPassword = await this.dependencies.encryption.compare(password, user.dataValues.password);

            if (!verifyPassword) {
                throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
            } else {
                const token = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey, '1h');
                const refreshToken = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey, '2h');

                return {
                    token,
                    refreshToken,
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

    async refreshToken({ refreshToken }) {
        try {
            const tokenData = this.dependencies.tokenGenerator.verify(refreshToken, this.dependencies.appSecretKey);

            const user = await models.users.findOne({
                where: {
                    id: tokenData.id
                },
                attributes: ["id", 'email', "admin_type_id"]
            });

            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }

            const newAccessToken = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey, '1h');
            const newRefreshToken = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey, '2hr');

            return {
                token: newAccessToken,
                refreshToken: newRefreshToken
            };
        } catch (error) {
            console.log(error);
            if (error.message === 'Token expired') {
                throw this.dependencies.exceptionHandling.throwError("Refresh token expired", 401);
            } else {
                throw this.dependencies.exceptionHandling.throwError(error.message, 500);
            }
        }
    }

    // async login({ email, password }) {
    //     try {
    //         let user = await models.users.findOne({
    //             where: {
    //                 email: email
    //             },
    //             attributes: ["id", 'email', "password", "admin_type_id"]
    //         });

    //         if (!user.dataValues) {
    //             throw this.dependencies.exceptionHandling.throwError("User not found", 404);
    //         }

    //         console.log("found user ", user.dataValues);

    //         const verifyPassword = await this.dependencies.encryption.compare(password, user.dataValues.password);

    //         if (!verifyPassword) {
    //             throw this.dependencies.exceptionHandling.throwError("Incorrect password", 401);
    //         } else {

    //             const token = this.dependencies.tokenGenerator.generate(user.dataValues, this.dependencies.appSecretKey, '24h');
    //             return {
    //                 token,
    //                 ...user.dataValues
    //             };

    //         }

    //     } catch (error) {
    //         console.log(error);
    //         if (error.statusCode) {
    //             throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
    //         } else {
    //             throw this.dependencies.exceptionHandling.throwError(error.message, 500);
    //         }
    //     }
    // }

    async changePassword({ userId, currentPassword, newPassword }) {
        try {

            const user = await models.users.findByPk(userId, {
                attributes: ['id', 'email', 'password'],
            });

            if (!user) {
                throw this.dependencies.exceptionHandling.throwError('User not found', 404);
            }


            const isPasswordValid = await this.dependencies.encryption.compare(
                currentPassword,
                user.password
            );

            if (!isPasswordValid) {
                throw this.dependencies.exceptionHandling.throwError(
                    'Incorrect current password',
                    401
                );
            }


            const hashedNewPassword = await this.dependencies.encryption.hash(
                newPassword
            );


            await user.update({ password: hashedNewPassword });

            return { message: 'Password changed successfully' };
        } catch (error) {
            console.log(error);
            if (error.statusCode) {
                throw this.dependencies.exceptionHandling.throwError(
                    error.message,
                    error.statusCode
                );
            } else {
                throw this.dependencies.exceptionHandling.throwError(
                    error.message,
                    500
                );
            }
        }
    }
    //forgot password
    async forgotPassword(email) {
        try {
            const user = await models.users.findOne({ where: { email } });
            if (!user) {
                throw this.dependencies.exceptionHandling.throwError("User not found", 404);
            }

            const resetToken = await generateVerificationToken();
          
            await sendEmail(email, 'Password Reset', `Please click the following link to reset your password: ${resetToken}`);
            user.verification_token = resetToken;
            await user.save();
            return { message: 'Password reset instructions sent to your email' };
        } catch (error) {
            console.log(error);
            if (error.statusCode) {
                throw this.dependencies.exceptionHandling.throwError(error.message, error.statusCode);
            } else {
                throw this.dependencies.exceptionHandling.throwError(error.message, 500);
            }
        }
    }


//reset password
async resetPassword(id, token, newPassword) {
    try {
        const user = await models.users.findByPk(id, {
            attributes: ['id', 'email', 'password', 'verification_token'],
        });
        if (!user) {
            throw this.dependencies.exceptionHandling.throwError("User not found", 404);
        }

        if (token !== user.verification_token) {
            throw this.dependencies.exceptionHandling.throwError("Invalid token", 400);
        }

        const hashedNewPassword = await this.dependencies.encryption.hash(newPassword);
        await user.update({ password: hashedNewPassword });

        await user.update({ verification_token: null });

        return { message: 'Password reset successfully' };
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
