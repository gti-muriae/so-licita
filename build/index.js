"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('express-async-errors');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const application = (0, express_1.default)();
const swaggerFile = require('../swagger_output.json');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
application.use((0, morgan_1.default)('dev'));
application.use(express_1.default.json());
application.use(express_1.default.urlencoded({ extended: true }));
application.use(routes_1.router);
application.use((0, cors_1.default)());
application.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        res.status(200).send({});
    }
    next();
});
application.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json(err.message);
        return next();
    }
    res.status(500).json({
        error: "Server Internal Error"
    });
    return next();
});
routes_1.router.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerFile));
application.listen(process.env.PORT, () => {
    console.log(`Server running port  ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map