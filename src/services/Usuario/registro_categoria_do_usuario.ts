import { PrismaClient } from "@prisma/client";
interface IRequest {
    idCategoria: number;
    idUsuario: number;

}

const prisma = new PrismaClient();
export async function registroCategoriaDoUsuario(data: Array<IRequest>): Promise<void> {
    if (data.length != null) {

        data.forEach(async (index) => {
            console.log(index);
            const categoriaExist = await prisma.categoria.findUnique({ where: { id: index.idCategoria } });
            if (categoriaExist?.id === index.idCategoria) {
                await prisma.usuariocategoria.create({ data: index });
            }
        });
    } else {
        throw Error('Error Request');
    }
}