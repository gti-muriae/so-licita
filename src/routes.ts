import express, { Router } from "express";
import { UsuarioRupController } from "./controller/UsuarioRupController";
const usuarioRupController = new UsuarioRupController();
const router: Router = express();


router.post('/usuario/cadastro', usuarioRupController.create);


export {
    router
}