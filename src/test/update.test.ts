import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

interface IRequestUpdate {
    id: number;
    descNome: string;
    desc: string;
}
export async function UpdateCategoria(data: IRequestUpdate): Promise<{}> {
    const categoriaExist = await prisma.categoria.findFirst({ where: { id: data.id } });
    if (categoriaExist) {
        const categoria = await prisma.categoria.update({
            where: { id: data.id }, data: {
                desc: data.desc,
                descNome: data.descNome
            }
        });
        return categoria;
    } else {
        throw new Error('Categoria não existe');
    }

}

describe('Testando a função', () => {
    test('recebendo dados', () => {
        const expected = { id: 1, desc: "Servico", descNome: "Escolar" }

        expect(UpdateCategoria({ id: 1, desc: "Servico", descNome: "Escolar" })).toBe(expected)

    });
})