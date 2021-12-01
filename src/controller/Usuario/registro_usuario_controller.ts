import {Request, Response} from 'express';
import {registroUsuario} from '../../services/Usuario/registro_usuario';

export async function registroControllerUsuario(request: Request, response: Response): Promise<Response> {
    try {

        await registroUsuario(request.body);
        return response.status(201).json(request.body);
    } catch (err) {
        return response.status(400).json({
            // @ts-ignore
            message: err.message
        })
    }
}