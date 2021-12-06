import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function findLicitacaoPorPrefeitura(data: string): Promise<[]> {
    const prefeitura = await prisma.prefeitura.findFirst({ where: { cidade: data } });

    if (prefeitura?.cidade == data) {
        const licitacao = await prisma.$queryRaw<[]>`SELECT L.* FROM prefeitura P INNER JOIN licitacao L ON L.idPrefeitura = P.id WHERE P.cidade = ${data} `;
        console.log(licitacao);
        if (licitacao.length > 0) {
            return licitacao;
        }
        else {

            throw new Error('Prefeitura não possuir nenhuma licitação registrada no sistema!')
        }
    } else {
        throw new Error('Prefeitura não encontrada!')
    }

}