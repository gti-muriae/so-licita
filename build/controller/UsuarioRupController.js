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
exports.signUsuarioRup = exports.createUsuarioRup = void 0;
const usuarioRup_1 = require("../services/usuarioRup");
const service = new usuarioRup_1.UsuarioRup();
function createUsuarioRup(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield service.createUsuario(request.body);
        return response.status(201).json(user);
    });
}
exports.createUsuarioRup = createUsuarioRup;
function signUsuarioRup(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield service.signUSuarioRup(request.body);
        return response.status(200).json(user);
    });
}
exports.signUsuarioRup = signUsuarioRup;
//# sourceMappingURL=UsuarioRupController.js.map