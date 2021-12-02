import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
interface IFindLicitacaoRequest {
    categoria: string;

}
export async function findLicitacaoPorCategoria(data: IFindLicitacaoRequest): Promise<[]> {
   
    const licitacao = await prisma.$queryRaw<[]>`select L.* from categoria as C inner join licitacao as L on L.idCategoria = C.id where C.descNome =${data.categoria}`;
console.log(licitacao);
    if (licitacao.length == 0) {
        throw new Error('Licitaçoes não encontrada nesta categoria!')
    }

    return licitacao;



}