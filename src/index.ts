require('express-async-errors');
import cors from 'cors';
import dontenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from '../swagger_output.json';



const application: express.Application = express();


dontenv.config();
application.use(morgan('dev'))
application.use(express.json());
application.use(express.urlencoded({ extended: true }))
application.use(router);
application.use(cors());
application.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',
        '*');
    res.header('Access-Control-Allow-Header',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        res.status(200).send({})
    }
    next();
});

application.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json(err.message);
        return next();
    }
    res.status(500).json({
        error: "Server Internal Error"
    })
    return next();
})


application.listen(process.env.PORT, () => {
    console.log(`Server running port  ${process.env.PORT}`)
});
