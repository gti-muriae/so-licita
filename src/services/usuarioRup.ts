import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
const prisma = new PrismaClient();

interface IUserRequest {
    controler: number;
    apelido: string;
    senha: string;
    email: string;
    fonecel: string;
    cpf: string;
    ie: number;
    dtabertura: string;
    nome: string;
    endereco: string;
    numEndereco: number;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: number;
    cod: number;
    razaosocial: string;
    cnpj: string;
}
export class UsuarioRup {
    async createUsuario({
        controler, apelido, senha, email, fonecel, cpf, ie, dtabertura, nome, endereco, numEndereco, complemento,
        bairro, cidade, uf, cep, cod, razaosocial, cnpj
    }: IUserRequest) {
        const userExist = await prisma.usuario_rup.findFirst({
            where: {
                CONTROLE: controler, COD: cod

            }
        });
        if (userExist) {
            throw new Error('Usuario ja cadastrado');
        }
        const hashSenha = hashSync(senha, 10);

        const user = prisma.usuario_rup.create({
            data: {
                CONTROLE: controler, APELIDO: apelido, SENHA: hashSenha, EMAIL: email, FONECEL: fonecel, CPF: cpf, IE: ie, DTABERTURA: dtabertura, NOME: nome, ENDERECO: endereco, NUM_ENDERECO: numEndereco, COMPLEMENTO: complemento,
                BAIRRO: bairro, CIDADE: cidade, UF: uf, CEP: cep, COD: cod, RAZAOSOCIAL: razaosocial, CNPJ: cnpj
            }
        });
        return user;
    }

    async signUSuarioRup({ email, senha }: IUserRequest) {
        const user = await prisma.usuario_rup.findFirst({
            where: {
                EMAIL: email
            }
        });

        if (user) {
            if (compareSync(senha, user.SENHA!)) {
                return user;
            } else {
                throw new Error('E-mail ou senha incorretos!')
            }
        } else {
            throw new Error('Usuário não encontrado')
        }
    }

}