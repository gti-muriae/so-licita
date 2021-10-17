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
    fcmToken: string;
}


export async function createUsuario({
    controler,
    apelido,
    senha,
    email,
    fonecel,
    cpf,
    ie,
    dtabertura,
    nome,
    endereco,
    numEndereco,
    complemento,
    bairro,
    cidade,
    uf,
    cep,
    cod,
    razaosocial,
    cnpj, fcmToken
}: IUserRequest): Promise<void> {
    const userExist = await prisma.usuario_rup.findFirst({
        where: {
            CONTROLE: controler,

        }
    });
    if (userExist) {
        throw new Error('Usuario ja cadastrado');
    }
    const hashSenha = hashSync(senha, 10);
    await prisma.usuario_rup.create({
        data: {
            CONTROLE: controler,
            APELIDO: apelido,
            SENHA: hashSenha,
            EMAIL: email,
            FONECEL: fonecel,
            CPF: cpf,
            IE: ie,
            DTABERTURA: dtabertura,
            NOME: nome,
            ENDERECO: endereco,
            NUM_ENDERECO: numEndereco,
            COMPLEMENTO: complemento,
            BAIRRO: bairro,
            CIDADE: cidade,
            UF: uf,
            CEP: cep,
            COD: cod,
            RAZAOSOCIAL: razaosocial,
            CNPJ: cnpj, FCMTOKEN: fcmToken
        }
    }).then((index) => {
        return index;
    }).catch((err) => {
        throw new Error('Houve um error ao registar dados!')
    });

}

export async function signUSuarioRup({ email, senha }: IUserRequest): Promise<void> {
    await prisma.usuario_rup.findFirst({
        where: {
            EMAIL: email
        }
    }).then((index) => {
        if (index) {
            if (compareSync(senha, index.SENHA!)) {
                return index;
            } else {
                throw new Error('E-mail ou senha incorretos!')
            }
        } else {
            throw new Error('Usuário não encontrado')
        }
    }).catch((err) => {
        console.log(err);
    });


}

export async function updateFmcToken(fcmToken: string, controler_cod: any): Promise<void> {
    await prisma.usuario_rup.update({
        where: {
            CONTROLE_COD: controler_cod
        }, data: {
            FCMTOKEN:
        }
    })
}