"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const PrefeituraController_1 = require("./controller/PrefeituraController");
const UsuarioRupController_1 = require("./controller/UsuarioRupController");
const usuarioRupController = new UsuarioRupController_1.UsuarioRupController();
const prefeituraController = new PrefeituraController_1.PrefeituraController();
const router = (0, express_1.default)();
exports.router = router;
const multer_1 = __importDefault(require("multer"));
const multerConfig = __importStar(require("./config/s3.config"));
const licitacao_1 = require("./services/licitacao");
//UsuarioRup
router.post('/usuario/cadastrado', usuarioRupController.create);
router.post('/usuario/login', usuarioRupController.signUsuarioRup);
//prefeitura
router.post('/prefeitura/register', prefeituraController.register);
router.post("/licitacao/registro", (0, multer_1.default)(multerConfig).single("file"), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const fileType = request.file;
    console.log(fileType === null || fileType === void 0 ? void 0 : fileType.destination);
    const { codlic, numlic, categoria, descricao, dataInicio, dataFinal, dataAmm } = request.body;
    const licitacao = yield (0, licitacao_1.register)({
        codlic,
        numlic,
        categoria,
        descricao,
        dataInicio,
        dataFinal,
        dataAmm, link: 'link'
    });
    return response.status(201).json(licitacao);
}));
//# sourceMappingURL=routes.js.map