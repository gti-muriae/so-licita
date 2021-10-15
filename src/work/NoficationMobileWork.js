import { admin } from '../config/firebase.config';

module.exports = {
    key: 'NotificationPush',
    options: {
        lifo: true, delay: 2000
    },
    async handle({ data }) {
        const { dados } = data;

        await admin.messaging().sendToDevice(dados.fcmToken, {
            notification: {
                title: 'Nova licitação está disponivel.',
                body: 'Acesse agora o app para mais info...'
            }
        }, {
            priority: 'high',
            timeToLive: 60 * 60
        }).then((index) => {
            console.log('Notification send successfully');
        }).catch((err) => {
            console.log(err);
        });
    }
}
