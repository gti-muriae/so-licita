"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.options = exports.key = void 0;
exports.key = 'NotificationEmail';
const Mail_1 = __importDefault(require("../lib/Mail"));
exports.options = {
    lifo: true, delay: 2000
};
function handle(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = data;
        yield Mail_1.default.sendMail({
            from: 'So-Licita<solicita@gmail.com.br>',
            to: `${user.name}<${user.mail}>`,
            subject: 'Nova licitação disponivel',
            html: `Ola,${user.name},Foi aberta uma nova licitação acesse agora o site ou aplicativo e tenha mais informações.`
        });
    });
}
exports.handle = handle;
//# sourceMappingURL=NotificationEmailWork.js.map