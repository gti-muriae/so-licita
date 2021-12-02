import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ILicitacaoRequest {
    numLicit: string;
    idCategoria: number;
    desc: string;
    datInicio: string;
    datFinal: string;
    datAmm: string;
    urlPdf: string;
    flgStatus: string;

}
export async function registroLicitacao(data: ILicitacaoRequest): Promise<{}> {
    const licitacao = await prisma.licitacao.findFirst({ where: { numLicit: data.numLicit } });

    if (licitacao) {
        throw new Error('Licitação já cadastrada no sistema!')
    } else {
        return await prisma.licitacao.create({ data: data });
    }

}