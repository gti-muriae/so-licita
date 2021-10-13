import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

interface ILicitacaoRequest {
    codlic: number;
    numlic: string;
    categoria: string;
    descricao: string;
    dataInicio: string;
    dataFinal: string;
    dataAmm: string;
    link: string;
}

export async function register({ codlic, numlic, categoria, descricao, dataInicio, dataFinal, dataAmm, link }: ILicitacaoRequest) {
    const licitacao = await prisma.licitacao.findFirst({
        where: {
            CODLIC: codlic,
            NUM_LIC: numlic
        }
    });
    if (licitacao) {
        throw new Error("Licitação já resgristada no sistema!")
    }
    return await prisma.licitacao.create({
        data: {
            CODLIC: codlic, NUM_LIC: numlic, CATEGORIA: categoria, DESCRICAO: descricao, DATA_INICIO: dataInicio, DATA_FINAL: dataFinal, DATA_AMM: dataAmm, LINK: link
        }
    });

}
