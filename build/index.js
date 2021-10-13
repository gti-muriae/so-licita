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
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const application = (0, express_1.default)();
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
//salvas arquivos na pasta local
application.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp", "arquivos")));
application.listen(process.env.PORT, () => {
    console.log(`Server running port  ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map