import {Request, Response} from "express";
import {UsuarioRup} from "../services/usuarioRup";

const service = new UsuarioRup();

export async function createUsuarioRup(request: Request, response: Response) {

    const user = await service.createUsuario(request.body);
    return response.status(201).json(user);

}

export async function signUsuarioRup(request: Request, response: Response) {
    const user = await service.signUSuarioRup(request.body);
    return response.status(200).json(user);

}

