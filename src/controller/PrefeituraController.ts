import { Request, Response } from "express";
import { PrefeituraServices } from "../services/prefeituraService";
const service = new PrefeituraServices();

export async function registerPrefeitura(request: Request, response: Response) {
    const prefeitura = await service.register(request.body);
    return response.status(201).json(prefeitura);
}
