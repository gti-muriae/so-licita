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
exports.registerPrefeitura = void 0;
const prefeituraService_1 = require("../services/prefeituraService");
const service = new prefeituraService_1.PrefeituraServices();
function registerPrefeitura(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const prefeitura = yield service.register(request.body);
        return response.status(201).json(prefeitura);
    });
}
exports.registerPrefeitura = registerPrefeitura;
//# sourceMappingURL=PrefeituraController.js.map