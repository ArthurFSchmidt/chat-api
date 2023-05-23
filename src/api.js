var express = require("express");
const { checkToken } = require("./util/token");
var app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
const salaController = require("./controller/salaController");

const router = express.Router();

app.use("/", router.get("/", (req, res)=> {
    res.status(200).send("<h1>API - CHAT</h1>")
}))

app.use("/sobre", router.get("/sobre",(req, res, next)=> {
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"ArthurFSchmidt"
    })
}))

app.use("/entrar", router.post("/entrar", async(req, res, next)=> {
    const usuarioController = require("./controller/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/salas", router.get("/salas", async (req, res, next)=> {
    if(await checkToken(req.headers.token, req.headers.nick, req.headers.iduser)){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuario nao autorizado."});
    }
}));

app.use("/salas/entrar", router.get("/salas/entrar", async (req, res, next)=> {
    if(await checkToken(req.headers.token, req.headers.nick, req.headers.iduser)){
        let resp = await salaController.entrar(req.headers.iduser, req.query.idsala)
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuario nao autorizado."});
    }
}));

app.use("/mensagem/enviar", router.post("/mensagem/enviar", async (req, res) => {
    if(await checkToken(req.headers.token, req.headers.nick, req.headers.iduser)){
        let resp = await salaController.enviarMensagem(req,headers.nick, req.body.msg, req.body.idsala);
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuario nao autorizado."});
    }
}));

app.use("/mensagem/listar", router.post("/mensagem/listar", async (req, res) => {
    if(await checkToken(req.headers.token, req.headers.nick, req.headers.iduser)){
        let resp = await salaController.buscarMensagens(req.query.idsala, req.query.timestamp);
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Usuario nao autorizado."});
    }
}));


module.exports = app;
