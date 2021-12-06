import { Response, Request } from "express";
import { registroCategoriaDoUsuario } from "../../services/Usuario/registro_categoria_do_usuario";

export async function registroCategoriaDoUsuarioController(request: Request, response: Response): Promise<Response> {

    return await registroCategoriaDoUsuario(request.body).then((_) => {
        return response.status(201).json({ message: "ok" });
    }).catch( async (err) => {
         // @ts-ignore
        return response.status(400).json({
            message: err.message
        });
    });


}