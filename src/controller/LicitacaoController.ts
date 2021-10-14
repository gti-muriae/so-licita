import {Request, Response} from "express";
import {register} from "../services/licitacao";

export async function registerLicitacao(request: Request, response: Response) {
    const licitacao = await register(
        request.body
    );
    return response.status(201).json(licitacao);
}


