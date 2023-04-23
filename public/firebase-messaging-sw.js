importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBk3U81PUD7ChMNv2Iy9nb1_cDXUlzlfh4",
    authDomain: "ramonpush-ec112.firebaseapp.com",
    projectId: "ramonpush-ec112",
    storageBucket: "ramonpush-ec112.appspot.com",
    messagingSenderId: "43395237087",
    appId: "1:43395237087:web:91868c240388afacc3956a"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app)


messaging.onBackgroundMessage(payload => {
    console.log("Recibiste un mensaje mientras estabas ausente");
    console.log(payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "https://www.freepngimg.com/thumb/dragon/22099-6-dragon.png"
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
});