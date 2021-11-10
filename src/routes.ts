import { Router } from "express";
import { getUsuario, registerLicitacao, searchLictCategoria } from "./controller/LicitacaoController";
import { registerPrefeitura } from "./controller/PrefeituraController";
import { createUsuarioRup, signUsuarioRup, updateToken } from "./controller/UsuarioRupController";
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







