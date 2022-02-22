package com.gti.solicita.service;

import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.stereotype.Service;

@Service
public class FCMService {
    private final FirebaseMessaging messaging;

    public FCMService(FirebaseMessaging messaging) {
        this.messaging = messaging;
    }


   /* public String sendNotification() throws FirebaseMessagingException {
        Notification notification = Notification.builder().setTitle("").setBody("").build();
        Message message = Message.builder().setToken("").setNotification("45").putAllData().build();
        return messaging.send(message);
    }*/
}
