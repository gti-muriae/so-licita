import { Router } from "express";
import { registroCategoriaController } from "./controller/Categoria/registro_categoria_controller";
import { registroLicitacaoController } from "./controller/Licitacao/registro_licitacao";
import { loginUsuarioController } from "./controller/Usuario/login_usaurio_controller";
import { registroControllerUsuario } from "./controller/Usuario/registro_usuario_controller";

const router = Router();

//Usuario
router.post('/usuario/registro', (request, response) => registroControllerUsuario(request, response));
router.post('/usuario/login', (request, response) => loginUsuarioController(request, response));


//Licitação
router.post('/licitacao/registro', (request, response) => registroLicitacaoController(request, response));


//Categoria
router.post('/categoria/registro', (request, response) => registroCategoriaController(request, response));

export { router }



