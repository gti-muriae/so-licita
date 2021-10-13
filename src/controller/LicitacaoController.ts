import { Request, Response } from "express";
import { register } from "../services/licitacao";
export class LicitacaoController {
    async register(request: Request, response: Response) {
        const licitacao = await register(request.body);
        return response.status(201).json(licitacao);

    }
}