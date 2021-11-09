import { Request, Response } from "express";
import { createUsuario, signUSuarioRup, updateFMCToken } from "../services/usuarioRup";




async function createUsuarioRup(request: Request, response: Response) {

    await createUsuario(request.body).then((index) => {
        return response.status(201).json(index);
    }).catch((err) => {
        console.log(err);
    });
}

async function signUsuarioRup(request: Request, response: Response) {
    await signUSuarioRup(request.body).then((index) => {
        return response.status(200).json(index);
    }).catch((err) => {
        console.log(err);
    })
}
async function updateToken(request: Request, response: Response) {
    const { id, fcmToken } = request.body;
    await updateFMCToken(id, fcmToken).then((index) => {
        return response.status(200).json(index);
    }).catch((err) => {
        console.log(err.message)
    })
}

export { signUsuarioRup, createUsuarioRup, updateToken }