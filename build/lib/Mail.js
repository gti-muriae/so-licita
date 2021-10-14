"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config = require('../config/mail.config');
exports.default = nodemailer_1.default.createTransport(config);
//# sourceMappingURL=Mail.js.map