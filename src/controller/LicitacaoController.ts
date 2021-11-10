import { Request, Response } from "express";
import { registerLic, searchLicitCat } from "../services/licitacao";
import { getUsuarioRup } from "../services/usuarioRup";

async function registerLicitacao(request: Request, response: Response): Promise<Response> {
    console.log(request.body);
    const licitacao = await registerLic(
        request.body
    );
    return response.status(201).json(licitacao);
}

async function getUsuario(request: Request, response: Response): Promise<Response> {
    const res = await getUsuarioRup();
    return response.status(200).json(res);

}
async function searchLictCategoria(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const res = await searchLicitCat(parseInt(id))
    return response.status(200).json(res);

}

export { registerLicitacao, getUsuario, searchLictCategoria }
