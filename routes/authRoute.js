const express = require("express");

const AuthController = require("../controllers/auth/authController");

module.exports = (dependencies)=> {

    const authController = new AuthController(dependencies);
    
    const router = express.Router();

    router.post('/login', async (req, res, next) => {
        try{
            let {email, password} =  req.body;
            if(!email || !password) {
                throw dependencies.exceptionHandling.throwError("request Body must have phone and password", 400);
            }
            const authresult = await authController.login({email, password});

            return res.status(200).json(authresult);
        }catch(error) {
            console.log(error);
            if(error.statusCode){
                return res.status(error.statusCode).json({ message: error.message })
            }else{
                return res.status(500).json({ message: "Internal Server Error" })
            }
        }
    });

    router.get('/logout', async (req, res, next) => {
        try{
            req.user = null;
            return res.json("logout success");
        }catch(error) {
            console.log(error);

            if(error.statusCode){
                return res.status(error.statusCode).json({ message: error.message })
            }else{
                return res.status(500).json({ message: "Internal Server Error" })
            }
        }
    });

    router.get('/authorize', async (req, res, next) => {
        try{
            if(!req.headers.authorization){
                throw dependencies.exceptionHandling.throwError("token not Given", 400);
            }

            const token = req.headers.authorization.split(" ")[1];
  
            let user = await dependencies.tokenGenerator.verify(token, dependencies.appSecretKey);/* as JwtPayload*/;
            if(!user){
                throw dependencies.exceptionHandling.throwError("Invalid Token", 401);
            }
            return res.status(200).json({
                token,
                ...user
            });

        }catch(error) {
            console.log(error);
            if(error.statusCode){
                return res.status(error.statusCode).json({ message: error.message })
            }else{
                return res.status(500).json({ message: "Internal Server Error" })
            }
        }
    });
   
    return router;

}

