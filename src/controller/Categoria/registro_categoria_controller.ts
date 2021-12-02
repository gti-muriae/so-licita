import { Request, Response } from 'express';
import { request } from 'http';
import { registroCategoria } from '../../services/Categoria/registro_categoria';

export async function registroCategoriaController(request: Request, response: Response): Promise<Response> {
    const { descNome,
        desc } = request.body;
    try {
        const categoria = await registroCategoria({ descNome, desc });
        return response.status(200).json({ message: "Categoria registrada com sucesso!", body: categoria });
    } catch (err) {
        console.log(err);
        // @ts-ignore
        return response.status(400).json({ message: err.message });
    }


}