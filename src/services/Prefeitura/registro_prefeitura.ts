import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface IRegistroPrefeituraRequest {
    nome: string;
    endereco: string;
    numero: number;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cod_cep: number;
}
export async function registroPrefeitura(data: IRegistroPrefeituraRequest): Promise<{}> {
    const prefeitura = await prisma.prefeitura.findFirst({ where: { nome: data.nome } });

    if (prefeitura?.nome == data.nome) {
        throw new  Error('Prefeitura já registrada no sistema!');
    }
    else {
        return await prisma.prefeitura.create({
            data: {
                nome: data.nome,
                endereco: data.endereco,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                uf: data.uf,
                cod_cep: data.cod_cep
            }
        });
    }

}