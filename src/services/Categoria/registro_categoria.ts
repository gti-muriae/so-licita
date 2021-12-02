import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

interface ICategoriaRequest {
    descNome: string;
    desc: string;
}

export async function registroCategoria(data: ICategoriaRequest): Promise<{}> {

    const categoria = await prisma.categoria.findFirst({where: {descNome: data.descNome}});

    if (categoria) {
        throw new Error('Categoria já registrada no Sistema!');
    }

    return await prisma.categoria.create({data: {descNome: data.descNome, desc: data.desc}});


}