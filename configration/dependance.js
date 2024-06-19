

const Mysql = require("../infrastructure/persistance/mysql/connection");
const EncryptionService = require("../infrastructure/service/authentatication/encripution");
const TokenGeneratorService = require("../infrastructure/service/authentatication/tokenGenerator");
const ExceptionHandlingService = require("../infrastructure/service/exception/expceptionHandle");







module.exports = class Configuration{
    
     port;
     database;
     appSecretKey;
     appAddress;
     encryption;
     tokenGenerator;
     exceptionHandling;
     
     

    constructor(){
        this.port = 8080;
        this.database = new Mysql();
        this.appSecretKey = "ecommerce";
        this.appAddress = `http://localhost:${this.port}`;
        this.encryption = new EncryptionService();
        this.tokenGenerator = new TokenGeneratorService();  
        this.exceptionHandling = new ExceptionHandlingService();       
      
    }

    getDependencies(){
        try{
            return {
                port: this.port,
                database: this.database,
                appSecretKey: this.appSecretKey, 
                appAddress: this.appAddress,
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