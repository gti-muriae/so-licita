import { PrismaClient } from ".prisma/client";

import Queue from '../lib/Queue';

const prisma = new PrismaClient();

interface ILicitacaoRequest {
    codlic: number;
    numlic: string;
    categoria: string;
    descricao: string;
    dataInicio: string;
    dataFinal: string;
    dataAmm: string;
    urllic: string;
}

async function register({
    codlic,
    numlic,
    categoria,
    descricao,
    dataInicio,
    dataFinal,
    dataAmm,
    urllic
}: ILicitacaoRequest) {
    const licitacao = await prisma.licitacao.findFirst({
        where: {
            CODLIC: codlic
        }
    });
    if (licitacao) {
        throw new Error("Licitação já resgristada no sistema!")
    }

    return await prisma.licitacao.create({
        data: {
            CODLIC: codlic,
            NUM_LIC: numlic,
            CATEGORIA: categoria,
            DESCRICAO: descricao,
            DATA_INICIO: dataInicio,
            DATA_FINAL: dataFinal,
            DATA_AMM: dataAmm,
            LINK: urllic
        }
    }).then(async (index) => {

        console.log(index.CODLIC);



    }).catch((err) => {
        console.log(err);
    })

}

async function updateLink(codlic: number, url: string): Promise<void> {


    await prisma.licitacao.update({
        where: {
            CODLIC: codlic
        }, data: {
            LINK: url
        }
    }).then(async (index) => {
        const data = await prisma.usuario_rup.findMany();
        data.forEach(async (e) => {
            const dados = {
                name: e.APELIDO, mail: e.EMAIL
            }

            await Queue.add('NotificationEmail', { dados });
        });

        return index;
    }).catch((err) => {
        console.log(err);
        throw new Error('Houve um error ao atualizar link do arquivo');
    });


}

export {
    register
    , updateLink
}

