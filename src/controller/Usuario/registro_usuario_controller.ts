import { Request, Response } from 'express';
import { request } from 'http';
import { registroUsuario } from '../../services/Usuario/registro_usuario';

export async function registroControllerUsuario(request: Request, response: Response): Promise<Response> {
    const { email,
        apelido,
        senha,
        contato,
        cpf,
        ie,
        datAbertura,
        nome,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        codCep,
        razSocial,
        codCnpj,
        fcmToken
    } = request.body
    try {

        await registroUsuario({
            email,
            apelido,
            senha,
            contato,
            cpf,
            ie,
            datAbertura,
            nome,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            codCep,
            razSocial,
            codCnpj,
            fcmToken
        });
        return response.status(201).json(request.body);
    } catch (err) {
        return response.status(400).json({
            // @ts-ignore
            message: err.message
        })
    }
}