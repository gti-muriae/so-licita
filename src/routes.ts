import express, { Router, Request, Response } from "express";
import { PrefeituraController } from "./controller/PrefeituraController";
import { UsuarioRupController } from "./controller/UsuarioRupController";
const usuarioRupController = new UsuarioRupController();
const prefeituraController = new PrefeituraController();
const router: Router = express();
import multer from 'multer';
import * as multerConfig from './config/s3.config';
import { LicitacaoController } from "./controller/LicitacaoController";
import { register } from "./services/licitacao";


//UsuarioRup
router.post('/usuario/cadastrado', usuarioRupController.create);
router.post('/usuario/login', usuarioRupController.signUsuarioRup);

//prefeitura
router.post('/prefeitura/register', prefeituraController.register);

router.post("/licitacao/registro", multer(multerConfig).single("file"), async (request: Request, response: Response) => {
    const fileType = request.file;
    console.log(fileType?.destination);

    const { codlic,
        numlic,
        categoria,
        descricao,
        dataInicio,
        dataFinal,
        dataAmm
    } = request.body;
    const licitacao = await register({
        codlic,
        numlic,
        categoria,
        descricao,
        dataInicio,
        dataFinal,
        dataAmm, link: 'link'
    });
    return response.status(201).json(licitacao);

})

export {
    router
}