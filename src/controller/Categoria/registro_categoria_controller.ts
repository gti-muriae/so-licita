import {Request, Response} from 'express';
import {registroCategoria} from '../../services/Categoria/registro_categoria';

export async function registroCategoriaController(request: Request, response: Response): Promise<Response> {
    try {
        const categoria = await registroCategoria(request.body);
        return response.status(200).json({message: "Categoria registrada com sucesso!", body: categoria});
    } catch (err) {
        console.log(err);
        // @ts-ignore
        return response.status(400).json({message: err.message});
    }


}