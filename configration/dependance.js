const EncryptionService = require("../infrastructure/service/authentatication/encryption");
const TokenGeneratorService = require("../infrastructure/service/authentatication/tokenGenerator");
const ExceptionHandlingService = require("../infrastructure/service/exception/expceptionHandle");

module.exports = class Configuration{
     appSecretKey;
     encryption;
     tokenGenerator;
     exceptionHandling;
     
    
    constructor(){
        this.appSecretKey = "ecommerce";
        this.encryption = new EncryptionService();
        this.tokenGenerator = new TokenGeneratorService();  
        this.exceptionHandling = new ExceptionHandlingService();       
      
    }

    getDependencies(){
        try{
            return {
                appSecretKey: this.appSecretKey, 
                encryption: this.encryption,
                tokenGenerator: this.tokenGenerator,
                exceptionHandling: this.exceptionHandling,
                routingValidator: this.routingValidator,
            }

        }catch(error){
            console.log(error);
        }
    }


}