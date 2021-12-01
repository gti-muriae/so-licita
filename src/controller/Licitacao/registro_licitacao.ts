import {Request, Response} from 'express';
import {registroLicitacao} from '../../services/Licitacao/registro_licitacao';

export async function registroLicitacaoController(request: Request, response: Response): Promise<Response> {
    try {
        const licitacao = registroLicitacao(request.body);
        return response.status(201).json(licitacao);
    } catch (err) {

        // @ts-ignore
        return response.status(400).json({message: err.message})
    }

}