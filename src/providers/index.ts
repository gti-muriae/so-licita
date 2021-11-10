import { Licitacao } from "../services/licitacao";
import { MailProvider } from "./implementations/MailProvider"

const mailProvider = new MailProvider();
export const service = new Licitacao(mailProvider)