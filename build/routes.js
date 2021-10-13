"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const s3_config_1 = require("./config/s3.config");
const LicitacaoController_1 = require("./controller/LicitacaoController");
const PrefeituraController_1 = require("./controller/PrefeituraController");
const UsuarioRupController_1 = require("./controller/UsuarioRupController");
const licitacao_1 = require("./services/licitacao");
const router = (0, express_1.Router)();
exports.router = router;
//UsuarioRup
router.post('/usuario/cadastrado', UsuarioRupController_1.createUsuarioRup);
router.post('/usuario/login', UsuarioRupController_1.signUsuarioRup);
//prefeitura
router.post('/prefeitura/register', PrefeituraController_1.registerPrefeitura);
//Licitação
router.post("/licitacao/registro", LicitacaoController_1.registerLicitacao);
//uploadS3
router.post('/licitacao/upload/:codlic', s3_config_1.uploadS3.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location: url = "" } = req.file;
    const { codlic } = req.params;
    yield (0, licitacao_1.updateLink)(parseInt(codlic), url).then((index) => {
        return res.status(200).json({
            message: "upload feito com sucesso",
            data: index
        });
    }).catch((err) => {
        return res.status(400).json("Error upload");
    });
}));
//# sourceMappingURL=routes.js.map