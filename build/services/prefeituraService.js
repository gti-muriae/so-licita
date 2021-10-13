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
exports.PrefeituraServices = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
class PrefeituraServices {
    register({ codPrefeitura, nome, endereco, numEndereco, complemento, bairro, cidade, uf, cep }) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefeitura = yield prisma.prefeitura.findFirst({
                where: { NOME: nome }
            });
            if (prefeitura) {
                throw new Error('Prefeitura ja cadastrada no sistema');
            }
            return yield prisma.prefeitura.create({
                data: {
                    CODPREFEITURA: codPrefeitura, NOME: nome, ENDEDRECO: endereco, NUM_ENDERECO: numEndereco, COMPLEMENTO: complemento, BAIRRO: bairro, CIDADE: cidade, UF: uf, CEP: cep
                }
            });
        });
    }
}
exports.PrefeituraServices = PrefeituraServices;
//# sourceMappingURL=prefeituraService.js.map