require('express-async-errors');
import express, { NextFunction, Request, Response } from 'express';
import dontenv from 'dotenv';
import { router } from './routes';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
const application: express.Application = express();
const swaggerFile = require('../swagger_output.json')
import swaggerUI from 'swagger-ui-express';

dontenv.config();
application.use(morgan('dev'))
application.use(express.json());
application.use(express.urlencoded({ extended: true }))
application.use(router);
application.use(cors());

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

router.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))


application.listen(process.env.PORT, () => {
    console.log(`Server running port  ${process.env.PORT}`)
});
