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
const application = (0, express_1.default)();
dotenv_1.default.config();
application.use((0, morgan_1.default)('dev'));
application.use(express_1.default.json());
application.use(routes_1.router);
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
application.listen(process.env.PORT, () => {
    console.log(`Server running port  ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map