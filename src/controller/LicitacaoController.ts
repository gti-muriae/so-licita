import { Request, Response } from "express";
import { registerLic } from "../services/licitacao";
import { getUsuarioRup } from "../services/usuarioRup";

export async function registerLicitacao(request: Request, response: Response) {
    const licitacao = await registerLic(
        request.body
    );
    return response.status(201).json(licitacao);
}

export async function getUsuario(request: Request, response: Response) {
    const usuario = await getUsuarioRup();
    return response.status(200).json(usuario);
}


