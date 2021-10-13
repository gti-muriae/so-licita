import { Router } from "express";
import { PrefeituraController } from "./controller/PrefeituraController";
import { UsuarioRupController } from "./controller/UsuarioRupController";
const usuarioRupController = new UsuarioRupController();
const prefeituraController = new PrefeituraController();
const router = Router();
import { uploadS3 } from './config/s3.config';
import { register, updateLink } from "./services/licitacao";


//UsuarioRup
router.post('/usuario/cadastrado', usuarioRupController.create);
router.post('/usuario/login', usuarioRupController.signUsuarioRup);

//prefeitura
router.post('/prefeitura/register', prefeituraController.register);

router.post("/licitacao/registro", async (req, res) => {
    console.log(req.body);
    const licitacao = await register(
        req.body
    );
    return res.status(201).json(licitacao);

});
router.post('/licitacao/upload/:codlic', uploadS3.single('file'), async (req, res) => {
    const { location: url = "" } = req.file;
    const { codlic } = req.params;
    await updateLink(parseInt(codlic), url).then((index) => {
        console.log(index);
        return res.status(200).json({
            message: "upload feito com sucesso"
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({});
    });


});

export {
    router
}