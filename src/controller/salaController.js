const salaModel = require('../model/salaModel');
const token = require("../util/token")

exports.get=async()=>{
        return await salaModel.listarSalas();
}

exports.entrar=async (iduser, idsala) => {
        const sala = await salaModel.buscarSala(idsala);
        let usuarioModel = require("../model/usuarioModel");
        let user = await usuarioModel.buscarUsuario(iduser);
        user.sala = {_id:sala._id, nome:sala.nome, tipo:sala.tipo};
        if(await usuarioModel.alterarUsuario(user)){
                return {msg:"ok", timestamp:timestamp=Date.now()};
        }
        return false;
}

exports.enviarMensagem=async (nick, msg, idsala) => {
        const sala = await salaModel.buscarSala(idsala);
        if(!sala.msgs){
                sala.msgs=[];
        }
        timestamp = Date.now();
        sala.msgs.push(
                {
                        timestamp:timestamp,
                        msg:msg,
                        nick:nick
                }
        )
        let resp = await salaModel.atualizarMensagens(sala);
        return {"msg":"ok","timestamp":timestamp};
}

exports.buscarMensagens=async (idsala, timestamp) => {
        let mensagens=await salaModel.buscarMensagens(idsala, timestamp);
        return {
                "timestamp":mensagens[mensagens.lenght - 1].timestamp,
                "msgs":mensagens
        };
}