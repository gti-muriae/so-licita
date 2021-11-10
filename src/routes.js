import { Router } from "express";
import { uploadS3 } from './config/s3.config';
import { getUsuario, registerLicitacao, searchLictCategoria } from "./controller/LicitacaoController";
import { registerPrefeitura } from "./controller/PrefeituraController";
import { createUsuarioRup, signUsuarioRup, updateToken } from "./controller/UsuarioRupController";
import { updateLink } from "./services/licitacao";



export const router = Router();


//UsuarioRup
router.post('/usuario/cadastrado', createUsuarioRup);
router.post('/usuario/login', signUsuarioRup);
router.get('/usuario', getUsuario);
router.put('/usuario/token/update', updateToken)

//prefeitura
router.post('/prefeitura/register', registerPrefeitura);

//Licitação
router.post("/licitacao/registro", registerLicitacao);
router.get("/licitacao/categoria/:id", (request, response) => searchLictCategoria(request, response))



//uploadS3
router.post('/licitacao/upload/:codlic', uploadS3.single('file'), async (req, res) => {
    const { location: url = "" } = req.file;
    const { codlic } = req.params;
    await updateLink(parseInt(codlic), url).then((index) => {
        return res.status(200).json({
            message: "upload feito com sucesso",
            data: index
        });
    }).catch((err) => {
        return res.status(400).json("Error upload");
    });
});




