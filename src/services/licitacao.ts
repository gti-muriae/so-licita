import { prisma } from "../export.spec";
interface ILicitacaoRequest {
    codlic: number;
    numlic: string;
    categoria: number;
    descricao: string;
    dataInicio: string;
    dataFinal: string;
    dataAmm: string;
    urllic: string;
}

async function registerLic({
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
            cod_Licit: codlic
        }
    });
    if (licitacao) {
        throw new Error("Licitação já resgristada no sistema!")
    }

    await prisma.licitacao.create({
        data: {
            cod_Licit: codlic,
            num_Licit: numlic,
            id_Categoria: categoria,
            desc: descricao,
            dat_Inicio: dataInicio,
            dat_Final: dataFinal,
            dat_Amm: dataAmm,
            url_PDF: urllic
        }
    }).then(async (index) => {
        return index;
    }).catch((err) => {
        console.log(err);
    })

}

async function updateLink(codlic: number, url: string): Promise<void> {

    await prisma.licitacao.update({
        where: {
            cod_Licit: codlic
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

export { updateLink, registerLic }
