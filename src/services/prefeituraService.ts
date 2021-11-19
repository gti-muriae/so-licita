import { prisma } from "../export.spec";



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
        where: { nome: nome }
    });
    if (prefeitura) {
        throw new Error('Prefeitura ja cadastrada no sistema');
    }
    await prisma.prefeitura.create({
        data: {
            nome: nome,
            endereco: endereco,
            numero: numEndereco,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            cod_cep: cep
        }
    }).then((index) => {
        return index;
    }).catch((err) => {
        throw new Error('Houve um error ao registar dados!');
    });


}
