require('express-async-errors');
import express, { NextFunction, Request, Response } from 'express';
import dontenv from 'dotenv';
import { router } from './routes';
import morgan from 'morgan';
const application: express.Application = express();

dontenv.config();
application.use(morgan('dev'))
application.use(express.json());
application.use(router);

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
