import { Request, Response } from "express";
import { LoginUsuario } from "../../services/Usuario/login_usuario";

export async function loginUsuarioController(request: Request, response: Response): Promise<Response> {
    try {
        const usuario = await  LoginUsuario(request.body);
        console.log(usuario);
        return response.status(200).json(usuario);
    } catch (err) {
        // @ts-ignore
        return response.status(400).json({message: err.message});
    }
}