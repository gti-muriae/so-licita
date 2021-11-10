import { Prisma } from "@prisma/client";
import { prisma } from "../export.spec";
interface ILicitacaoRequest {

    numlic: string;
    id_Categoria: number;
    descricao: string;
    dataInicio: string;
    dataFinal: string;
    dataAmm: string;
    urllic: string;
}

async function registerLic({
    numlic,
    id_Categoria,
    descricao,
    dataInicio,
    dataFinal,
    dataAmm,
    urllic
}: ILicitacaoRequest): Promise<void> {
    console.log(numlic);
    const licitacao = await prisma.licitacao.findFirst({
        where: {
            num_Licit: numlic
        }
    });
    console.log(licitacao);
    if (licitacao) {
        throw new Error("Licitação já resgristada no sistema!")
    }

    await prisma.licitacao.create({
        data: {

            num_Licit: numlic,
            id_Categoria: id_Categoria,
            desc: descricao,
            dat_Inicio: dataInicio,
            dat_Final: dataFinal,
            dat_Amm: dataAmm,
            url_PDF: urllic,
            flg_Status: 0

        }
    }).then(async (index) => {
        const usuario = await prisma.$queryRaw<[]>`SELECT U.email FROM usuario_rup U INNER JOIN usuariocategoria UC ON UC.id_Usuario = U.id_Usuario WHERE UC.id_Categoria = ${id_Categoria}`
        usuario.forEach((x) => {
            console.log(x['email']);
        })
        return index;
    }).catch((err) => {
        console.log(err);
    })

}

async function updateLink(codlic: number, url: string): Promise<void> {

    await prisma.licitacao.update({
        where: {
            id_Licit: codlic
        }, data: {
            url_PDF: url
        }
    }).then(async (index) => {
        const data = await prisma.usuario_rup.findMany();
        data.forEach(async (e) => {

            console.log(e.email);
        });

        return index;
    }).catch((err) => {
        console.log(err);
        throw new Error('Houve um error ao atualizar link do arquivo');
    });

}
async function searchLicitCat(id: number) {

    const lic = await prisma.licitacao.findMany({
        where: {
            id_Categoria: id, AND: {
                flg_Status: 0
            }
        }
    });
    if (lic.length) {
        console.log(lic);
        return lic;
    }


    throw new Error("Não foi encontrada nenhuma licitação nesta categoria.!")

}

export { updateLink, registerLic, searchLicitCat }
