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
const PrefeituraController_1 = require("./controller/PrefeituraController");
const UsuarioRupController_1 = require("./controller/UsuarioRupController");
const usuarioRupController = new UsuarioRupController_1.UsuarioRupController();
const prefeituraController = new PrefeituraController_1.PrefeituraController();
const router = (0, express_1.Router)();
exports.router = router;
const s3_config_1 = require("./config/s3.config");
const licitacao_1 = require("./services/licitacao");
//UsuarioRup
router.post('/usuario/cadastrado', usuarioRupController.create);
router.post('/usuario/login', usuarioRupController.signUsuarioRup);
//prefeitura
router.post('/prefeitura/register', prefeituraController.register);
router.post("/licitacao/registro", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const licitacao = yield (0, licitacao_1.register)(req.body);
    return res.status(201).json(licitacao);
}));
router.post('/licitacao/upload/:codlic', s3_config_1.uploadS3.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location: url = "" } = req.file;
    const { codlic } = req.params;
    yield (0, licitacao_1.updateLink)(parseInt(codlic), url).then((index) => {
        console.log(index);
        return res.status(200).json({
            message: "upload feito com sucesso"
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).json({});
    });
}));
//# sourceMappingURL=routes.js.map