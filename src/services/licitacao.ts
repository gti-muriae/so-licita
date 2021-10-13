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
    urllic: string;
}

async function register({ codlic, numlic, categoria, descricao, dataInicio, dataFinal, dataAmm, urllic }: ILicitacaoRequest) {
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
            CODLIC: codlic, NUM_LIC: numlic, CATEGORIA: categoria, DESCRICAO: descricao, DATA_INICIO: dataInicio, DATA_FINAL: dataFinal, DATA_AMM: dataAmm, LINK: urllic
        }
    }).catch((err) => {
        console.log(err);
    })

}

async function updateLink(codlic: number, url: string): Promise<void> {
    console.log(codlic + url);

    await prisma.licitacao.update({
        where: {
            CODLIC: codlic
        }, data: {
            LINK: url
        }
    }).then((index) => {
        console.log(index);
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

