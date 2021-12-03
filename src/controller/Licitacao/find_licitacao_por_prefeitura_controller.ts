import { Request, Response } from 'express';
import { findLicitacaoPorPrefeitura } from '../../services/Licitacao/find_licitacao_por_prefeitura';
export async function findLicitacaoPorPrefeituraController(request: Request, response: Response): Promise<Response> {
    const { cidade } = request.params;
    try {
        const licitacao = await findLicitacaoPorPrefeitura(cidade);
        return response.status(200).json(licitacao);
    } catch (err) {
        // @ts-ignoreF
        return response.status(400).json(err.message);
    }

}