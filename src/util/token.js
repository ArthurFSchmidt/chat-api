const jwt = require("jsonwebtoken");

const setToken = async (id,key) => {
    console.log(id);
    if (id) {
        return jwt.sign({id }, key, { expiresIn: 28800 });
    }
    return false;
};

const checkToken = async (token, key, idUser) => jwt.verify(token, key, (err, decoded) => {

    if(err){
        return false;
    }
    
    if(decoded.id == idUser){
        return true;
    }
    
    return false;
});

module.exports = {
    checkToken,
    setToken
};