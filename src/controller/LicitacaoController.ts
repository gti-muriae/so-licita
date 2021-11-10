import { Request, Response } from "express";
import { service } from "../providers";
import { getUsuarioRup } from "../services/usuarioRup";

async function registerLicitacao(request: Request, response: Response): Promise<Response> {
    const licitacao = await service.registerLic(
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
    const res = await service.searchLicitCat(parseInt(id))
    return response.status(200).json(res);
}
export { registerLicitacao, getUsuario, searchLictCategoria };

