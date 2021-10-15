import {Request, Response} from "express";
import {registerLic} from "../services/licitacao";

export async function registerLicitacao(request: Request, response: Response) {
    const licitacao = await registerLic(
        request.body
    );
    return response.status(201).json(licitacao);
}


