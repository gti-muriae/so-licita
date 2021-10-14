import Mail from '../lib/Mail';

module.exports = {
    key: 'NotificationEmail',
    options: {
        lifo: true, delay: 2000
    },
    async handle({ data }) {
        const { dados } = data;

        await Mail.sendMail({
            from: 'So-Licita<solicita@gmail.com.br>',
            to: `${dados.name}<${dados.mail}>`,
            subject: 'Nova licitação disponivel',
            html: `Ola,${dados.name},Foi aberta uma nova licitação acesse agora o site ou aplicativo e tenha mais informações.`
        });


    }
}

