import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";


interface IRequestUsuario {
    email: string;
    apelido: string;
    senha: string;
    contato: string;
    cpf: string;
    ie: number;
    datAbertura: string;
    nome: string;
    endereco: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    codCep: number;
    razSocial: string;
    codCnpj: number;
    fcmToken: string;

}

const prisma = new PrismaClient()
export async function registroUsuario(data: IRequestUsuario): Promise<void> {

    const usuario = await prisma.usuario_rup.findFirst({ where: { email: data.email } });

    if (usuario?.email == data.email) {
        throw new Error('Usuário já registrado!');
    }
    else {
        const hash = hashSync(data.senha, 10);
        await prisma.usuario_rup.create({
            data: {
                email: data.email,
                senha: hash,
                nome: data.apelido,
                apelido: data.apelido,
                contato: data.contato,
                ie: data.ie,
                cpf: data.cpf,
                datAbertura: data.datAbertura,
                endereco: data.endereco,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
                codCep: data.codCep,
                razSocial: data.razSocial,
                codCnpj: data.codCnpj,
                fmcToken: data.fcmToken
            }
        });

    }

}
