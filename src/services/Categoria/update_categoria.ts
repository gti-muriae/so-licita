import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

interface IRequestUpdate {
    id: number;
    descNome: string;
    desc: string;
}

export async function UpdateCategoria(data: IRequestUpdate): Promise<void> {
    await prisma.categoria.findFirst({ where: { id: data.id } }).then(async (e) => {
        await prisma.categoria.update({
            where: { id: data.id }, data: {
                desc: data.desc,
                descNome: data.descNome
            }
        })
    }).catch((e) => {
        throw new Error('Categoria não existe!!')
    });

}