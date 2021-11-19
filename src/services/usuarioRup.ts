
import { compareSync, hashSync } from "bcrypt";
import { prisma } from "../export.spec";


interface IUserRequest {

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


async function createUsuario({
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
            email: email,

        }
    });
    if (userExist) {
        throw new Error('Usuario ja cadastrado');
    }
    const hashSenha = hashSync(senha, 10);
    await prisma.usuario_rup.create({
        data: {
            apelido: apelido,
            senha: hashSenha,
            email: email,
            contato: fonecel,
            cod_cpf: cpf,
            ie: ie,
            dat_abertura: dtabertura,
            nome: nome,
            endereco: endereco,
            numero: numEndereco,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            cod_cep: cep,
            raz_social: razaosocial,
            cod_cnpj: cnpj,
            fmc_token: fcmToken
        }
    }).then((index) => {
        return index;
    }).catch((err) => {
        throw new Error('Houve um error ao registar dados!')
    });

}

async function signUSuarioRup({ email, senha }: IUserRequest): Promise<void> {
    await prisma.usuario_rup.findFirst({
        where: {
            email: email
        }
    }).then((index) => {
        if (index) {
            if (compareSync(senha, index.senha!)) {
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

async function getUsuarioRup() {
    try {
        const list = await prisma.usuario_rup.findMany();
        return list;
    } catch (e) { }
    throw new Error('Houve um error ao buscar informações')
}
async function updateFMCToken(id: number, fcmToken: string): Promise<void> {
    await prisma.usuario_rup.update({
        where: { id_usuario: id }, data: {
            fmc_token: fcmToken
        }
    }).then((index) => {
        return index;
    }).catch((err) => { throw new Error('Houve um error ao Atualizar informações') })
}

export { getUsuarioRup, signUSuarioRup, createUsuario, updateFMCToken }