import { Router } from "express";
import { registroCategoriaController } from "./controller/Categoria/registro_categoria_controller";
import { findLicitacaoPorCategoriaController } from "./controller/Licitacao/find_licitacao_por_categoria";
import { findLicitacaoPorPrefeituraController } from "./controller/Licitacao/find_licitacao_por_prefeitura_controller";
import { registroLicitacaoController } from "./controller/Licitacao/registro_licitacao";
import { registroPrefeituraController } from "./controller/Prefeitura/registro_prefeitura_controller";
import { loginUsuarioController } from "./controller/Usuario/login_usaurio_controller";
import { registroControllerUsuario } from "./controller/Usuario/registro_usuario_controller";

const router = Router();

//Usuario
router.post('/usuario/registro', (request, response) => registroControllerUsuario(request, response));
router.post('/usuario/login', (request, response) => loginUsuarioController(request, response));


//Licitação
router.post('/licitacao/registro', (request, response) => registroLicitacaoController(request, response));
router.post('/licitacao/categoria', (request, response) => findLicitacaoPorCategoriaController(request, response));
router.get('/licitacao/prefeitura/:cidade', (request, response) => findLicitacaoPorPrefeituraController(request, response));


//Categoria
router.post('/categoria/registro', (request, response) => registroCategoriaController(request, response));

//Prefeitura

router.post('/prefeitura/registro', (request, response) => registroPrefeituraController(request, response));

export { router }



