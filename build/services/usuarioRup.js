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
exports.UsuarioRup = void 0;
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
class UsuarioRup {
    createUsuario({ controler, apelido, senha, email, fonecel, cpf, ie, dtabertura, nome, endereco, numEndereco, complemento, bairro, cidade, uf, cep, cod, razaosocial, cnpj }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield prisma.usuario_rup.findFirst({
                where: {
                    CONTROLE: controler, COD: cod
                }
            });
            if (userExist) {
                throw new Error('Usuario ja cadastrado');
            }
            const user = prisma.usuario_rup.create({
                data: {
                    CONTROLE: controler, APELIDO: apelido, SENHA: senha, EMAIL: email, FONECEL: fonecel, CPF: cpf, IE: ie, DTABERTURA: dtabertura, NOME: nome, ENDERECO: endereco, NUM_ENDERECO: numEndereco, COMPLEMENTO: complemento,
                    BAIRRO: bairro, CIDADE: cidade, UF: uf, CEP: cep, COD: cod, RAZAOSOCIAL: razaosocial, CNPJ: cnpj
                }
            });
            return user;
        });
    }
}
exports.UsuarioRup = UsuarioRup;
//# sourceMappingURL=usuarioRup.js.map