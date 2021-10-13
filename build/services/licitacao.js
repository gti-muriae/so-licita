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
exports.register = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
function register({ codlic, numlic, categoria, descricao, dataInicio, dataFinal, dataAmm, link }) {
    return __awaiter(this, void 0, void 0, function* () {
        const licitacao = yield prisma.licitacao.findFirst({
            where: {
                CODLIC: codlic,
                NUM_LIC: numlic
            }
        });
        if (licitacao) {
            throw new Error("Licitação já resgristada no sistema!");
        }
        return yield prisma.licitacao.create({
            data: {
                CODLIC: codlic, NUM_LIC: numlic, CATEGORIA: categoria, DESCRICAO: descricao, DATA_INICIO: dataInicio, DATA_FINAL: dataFinal, DATA_AMM: dataAmm, LINK: link
            }
        });
    });
}
exports.register = register;
//# sourceMappingURL=licitacao.js.map