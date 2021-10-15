import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

interface IPrefeituraRequest {
    codPrefeitura: number;
    nome: string;
    endereco: string;
    numEndereco: number;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: number;
}

export async function registerPre({
    codPrefeitura,
    nome,
    endereco,
    numEndereco,
    complemento,
    bairro,
    cidade,
    uf,
    cep
}: IPrefeituraRequest): Promise<void> {
    const prefeitura = await prisma.prefeitura.findFirst({
        where: { NOME: nome }
    });
    if (prefeitura) {
        throw new Error('Prefeitura ja cadastrada no sistema');
    }
    await prisma.prefeitura.create({
        data: {
            CODPREFEITURA: codPrefeitura,
            NOME: nome,
            ENDEDRECO: endereco,
            NUM_ENDERECO: numEndereco,
            COMPLEMENTO: complemento,
            BAIRRO: bairro,
            CIDADE: cidade,
            UF: uf,
            CEP: cep
        }
    }).then((index) => {
        return index;
    }).catch((err) => {
        throw new Error('Houve um error ao registar dados!');
    });


}
