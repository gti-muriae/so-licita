import { Request, Response } from "express";
import { createUsuario, signUSuarioRup } from "../services/usuarioRup";




export async function createUsuarioRup(request: Request, response: Response) {

    await createUsuario(request.body).then((index) => {
        return response.status(201).json(index);
    }).catch((err) => {
        console.log(err);
    });
}

export async function signUsuarioRup(request: Request, response: Response) {
    await signUSuarioRup(request.body).then((index) => {
        return response.status(200).json(index);
    }).catch((err) => { 
        console.log(err);
    })
}

