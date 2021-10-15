import { PrismaClient } from ".prisma/client";

const Queue = require('../lib/Queue');

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

export async function registerLic({
    codlic,
    numlic,
    categoria,
    descricao,
    dataInicio,
    dataFinal,
    dataAmm,
    urllic
}: ILicitacaoRequest): Promise<void> {
    const licitacao = await prisma.licitacao.findFirst({
        where: {
            CODLIC: codlic
        }
    });
    if (licitacao) {
        throw new Error("Licitação já resgristada no sistema!")
    }

    await prisma.licitacao.create({
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
        return index;
    }).catch((err) => {
        console.log(err);
    })

}

export async function updateLink(codlic: number, url: string): Promise<void> {

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
            await Queue.add('NotificationPush', { dados });

        });

        return index;
    }).catch((err) => {
        console.log(err);
        throw new Error('Houve um error ao atualizar link do arquivo');
    });


}


