import { Request, Response } from "express";
import { UsuarioRup } from "../services/usuarioRup";
const service = new UsuarioRup();

export class UsuarioRupController {
    async create(request: Request, response: Response) {

        const user = await service.createUsuario(request.body);
        return response.status(201).json(user);


    }
    async signUsuarioRup(request: Request, response: Response) {
        const user = await service.signUSuarioRup(request.body);
        return response.status(200).json(user);

    }

}