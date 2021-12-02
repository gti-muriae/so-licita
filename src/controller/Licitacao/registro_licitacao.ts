import { Request, Response } from 'express';
import { registroLicitacao } from '../../services/Licitacao/registro_licitacao';

export async function registroLicitacaoController(request: Request, response: Response): Promise<Response> {
    const { numLicit,
        idCategoria,
        desc,
        datInicio,
        datFinal,
        datAmm,
        urlPdf,
        flgStatus } = request.body;
    try {
        const licitacao = await registroLicitacao({
            numLicit,
            idCategoria,
            desc,
            datInicio,
            datFinal,
            datAmm,
            urlPdf,
            flgStatus
        });
        return response.status(201).json(licitacao);
    } catch (err) {
        console.log(err)
        // @ts-ignore
        return response.status(400).json({ message: err.message })
    }

}