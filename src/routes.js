import { Router } from "express";
import { uploadS3 } from './config/s3.config';
import { getUsuario, registerLicitacao } from "./controller/LicitacaoController";
import { registerPrefeitura } from "./controller/PrefeituraController";
import { createUsuarioRup, signUsuarioRup } from "./controller/UsuarioRupController";
import { updateLink } from "./services/licitacao";
import BullBoard from 'bull-board';

const Queue = require('./lib/Queue');
BullBoard.setQueues(Queue.queues.map((queue) => queue.bull));
export const router = Router();


//UsuarioRup
router.post('/usuario/cadastrado', createUsuarioRup);
router.post('/usuario/login', signUsuarioRup);
router.get('/usuario',getUsuario);

//prefeitura
router.post('/prefeitura/register', registerPrefeitura);

//Licitação
router.post("/licitacao/registro", registerLicitacao);



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
router.use('/admin', BullBoard.UI);



