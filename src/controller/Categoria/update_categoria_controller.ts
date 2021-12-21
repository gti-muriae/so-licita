
import { Request, Response } from 'express';
import { UpdateCategoria } from '../../services/Categoria/update_categoria';
export async function updateCategoriaController(request: Request, response: Response): Promise<Response> {
    const { id, descNome, desc } = request.body;
    try {
        const categoria = await UpdateCategoria({ id, descNome, desc });
        return response.status(200).json(categoria);

    } catch (err) {
        // @ts-ignore
        return response.status(400).json({ message: err.message });

    }
}