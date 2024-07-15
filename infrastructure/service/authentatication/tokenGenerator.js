const jwt = require('jsonwebtoken');

module.exports = class TokenGenerator {
    
    constructor() {}

    generate(payload, secretId, expiresIn) {
        const token = jwt.sign(payload, secretId, { expiresIn });
        return token;
    }

    verify(token, secretId) {
        try {
            const data = jwt.verify(token, secretId);
            return data;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
               
                throw new Error('Token expired');
            } else {
                throw new Error('Token verification failed');
            }
        }
    }
};



// const jwt = require('jsonwebtoken');

// module.exports = class TokenGenerator {
    
//     constructor(){

//     }

//     generate(payload, secretId, expiresIn = '24h'){
//         const token = jwt.sign(payload, secretId, {expiresIn});
//         return token;
//     }

//     verify(token, secretId){
//         try{
//             const data = jwt.verify(token, secretId);
//             return data;
//         }catch(error){
            
//         }
//     }
// }  

