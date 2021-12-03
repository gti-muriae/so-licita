import { Response, Request } from "express";
import { registroPrefeitura } from "../../services/Prefeitura/registro_prefeitura";

export async function registroPrefeituraController(request: Request, response: Response): Promise<Response> {
    const {
        nome,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        cod_cep
    } = request.body;
    try {
        const prefeitura = await registroPrefeitura({
            nome,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            cod_cep
        });
        return response.status(201).json(prefeitura);
    } catch (e) {
        console.log(e);
        throw new Error('Não foi possivel registrar informações!')
    }

}