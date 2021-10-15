import { Request, Response } from "express";
import { registerPre } from "../services/prefeituraService";



export async function registerPrefeitura(request: Request, response: Response) {
    const prefeitura = await registerPre(request.body);
    return response.status(201).json(prefeitura);
}
