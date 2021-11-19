import { prisma } from "../export.spec";
import { IMailProvider } from '../providers/IMailProvider';
interface ILicitacaoRequest {
    numlic: string;
    id_Categoria: number;
    descricao: string;
    dataInicio: string;
    dataFinal: string;
    dataAmm: string;
    urllic: string;
}
export class Licitacao {
    constructor(private mailProvider: IMailProvider) { }
    async registerLic({
        numlic,
        id_Categoria,
        descricao,
        dataInicio,
        dataFinal,
        dataAmm,
        urllic
    }: ILicitacaoRequest): Promise<void> {
        console.log(numlic);
        const licitacao = await prisma.licitacao.findFirst({
            where: {
                num_licit: numlic
            }
        });

        if (licitacao) {
            throw new Error("Licitação já resgristada no sistema!")
        }

        await prisma.licitacao.create({
            data: {
                num_licit: numlic,
                id_categoria: id_Categoria,
                desc: descricao,
                dat_inicio: dataInicio,
                dat_final: dataFinal,
                dat_amm: dataAmm,
                url_pdf: urllic,
                flg_status: 0
            }
        }).then(async (index) => {
            const usuario = await prisma.$queryRaw<[]>`SELECT U.email,U.nome FROM usuario_rup U INNER JOIN usuariocategoria UC ON UC.id_Usuario = U.id_Usuario WHERE UC.id_Categoria = ${id_Categoria}`
            if (usuario) {
                console.log('Existe');
                usuario.forEach((snapshot) => {
                    this.mailProvider.sendMail({
                        to: {
                            name: snapshot['nome'],
                            email: snapshot['email']
                        },
                        from: {
                            name: 'Equipe SoLicita',
                            email: 'solicita@gmail.com'
                        },
                        subject: 'Foi cadastrar uma nova licitação',
                        body: '<p> Entre no Site ou no App para mais Informações.</p>'
                    })
                });
            }
            return index;
        }).catch((err) => {
            console.log(err);
        })

    }

    async updateLink(codlic: number, url: string): Promise<void> {

        await prisma.licitacao.update({
            where: {
                id_licit: codlic
            }, data: {
                url_pdf: url
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
    async searchLicitCat(id: number) {

        const lic = await prisma.licitacao.findMany({
            where: {
                id_categoria: id, AND: {
                    flg_status: 0
                }
            }
        });
        if (lic.length) {
            console.log(lic);
            return lic;
        }


        throw new Error("Não foi encontrada nenhuma licitação nesta categoria.!")

    }
}