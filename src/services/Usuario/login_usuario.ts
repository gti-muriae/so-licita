import { PrismaClient } from "@prisma/client"
import { compareSync } from "bcrypt";

const prisma = new PrismaClient();
interface authRequest {
    email: string;
    senha: string;
}

export async function LoginUsuario(auth: authRequest): Promise<{}> {


    const usuario = await prisma.usuario_rup.findFirst({ where: { email: auth.email } });
    if (usuario?.email != auth.email) {
        throw Error('E-mail inválido!')
    } else if (!compareSync(auth.senha, usuario.senha!)) {
        throw new Error('Senha inválida,Tente novamente!')

    } else {

        return usuario;

    }





}