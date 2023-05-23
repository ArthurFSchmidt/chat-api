const db = require("./db");

async function registrarUsuario(nick) {
    return await db.insertOne("usuario",{"nick":nick});
}

async function buscarUsuario(idUser) {
    return await db.findOne("usuarios",idUser);
}

async function alterarUsuario(user) {
    return await db.updateOne("usuarios", user, {_id:user._id});
}

module.exports = {registrarUsuario,buscarUsuario,alterarUsuario}