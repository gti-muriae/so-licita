import { Request, Response } from 'express';
import { findLicitacaoPorCategoria } from '../../services/Licitacao/find_licitacao_por_categoria';

export async function findLicitacaoPorCategoriaController(request: Request, response: Response): Promise<Response> {
    const { categoria } = request.body;
     try {
        const licitacao = await findLicitacaoPorCategoria(categoria);
        return response.status(200).json(licitacao);

    } catch (err) {
        // @ts-ignoreF
        return response.status(400).json({message : err.message})

    }


}