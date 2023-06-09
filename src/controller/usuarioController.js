const token = require("../util/token");
const usuarioModel = require("../model/usuarioModel");

exports.entrar=async(nick)=>{
    if(nick){
        let resp = await usuarioModel.registrarUsuario(nick);
        if(resp.insertedId){
            return {"idUser":resp.insertedId,
                    "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''), nick),
                    "nick": nick
                }
        }
        
    }
}