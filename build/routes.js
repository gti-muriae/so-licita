"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const UsuarioRupController_1 = require("./controller/UsuarioRupController");
const usuarioRupController = new UsuarioRupController_1.UsuarioRupController();
const router = (0, express_1.default)();
exports.router = router;
router.post('/usuario/cadastro', usuarioRupController.create);
//# sourceMappingURL=routes.js.map