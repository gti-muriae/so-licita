import { PrismaClient } from "@prisma/client";
import { Lightsail } from "aws-sdk";
import { url } from "inspector";

const prisma = new PrismaClient();
class Licitacao {
    id: number | undefined;
    numLicit: string | undefined;
    desc: string | undefined;
    idCategoria: number | undefined;
    datInicio: string | undefined;
    datFinal: string | undefined;
    datAmm: string | undefined;
    urlPdf: string | undefined;
    flgStatus: string | undefined;
    idPrefeitura: number | undefined;

    constructor(id: number,
        idCategoria: number,
        numLicit: string,
        desc: string,
        datInicio: string,
        datFinal: string,
        datAmm: string,
        urlPdf: string,
        flgStatus: string,
        idPrefeitura: number) {
        this.id = id;
        this.idCategoria = idCategoria;
        this.numLicit = numLicit;
        this.desc = desc;
        this.datInicio = datInicio;
        this.datFinal = datFinal;
        this.datAmm = datAmm;
        this.urlPdf = urlPdf;
        this.flgStatus = flgStatus;
        this.idPrefeitura = idPrefeitura;
    }


}
export async function findLicitacaoPorCodigo(cod: string): Promise<Licitacao | undefined> {
    const licitacao = await prisma.licitacao.findFirst({ where: { numLicit: cod } });
    if (licitacao) {
        return new Licitacao(licitacao.id, licitacao.idCategoria, licitacao.numLicit!, licitacao.desc!, licitacao.datInicio!, licitacao.datFinal!, licitacao.datAmm!, licitacao.urlPdf!, licitacao.flgStatus, licitacao.idPrefeitura);
    }
}