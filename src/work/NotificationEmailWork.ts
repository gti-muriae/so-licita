export const key = 'NotificationEmail';
import Mail from '../lib/Mail';
export const options = {
    lifo: true, delay: 2000
};

export async function handle(data: any): Promise<void> {
    const { user } = data;

    await Mail.sendMail({
        from: 'So-Licita<solicita@gmail.com.br>',
        to: `${user.name}<${user.mail}>`,
        subject: 'Nova licitação disponivel',
        html: `Ola,${user.name},Foi aberta uma nova licitação acesse agora o site ou aplicativo e tenha mais informações.`
    });


}