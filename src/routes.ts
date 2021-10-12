import express, { Router } from "express";
import { PrefeituraController } from "./controller/PrefeituraController";
import { UsuarioRupController } from "./controller/UsuarioRupController";
const usuarioRupController = new UsuarioRupController();
const prefeituraController = new PrefeituraController();
const router: Router = express();


//UsuarioRup
router.post('/usuario/cadastrado', usuarioRupController.create);
router.post('/usuario/login', usuarioRupController.signUsuarioRup);

//prefeitura
router.post('/prefeitura/register', prefeituraController.register);

export {
    router
}