//프로젝트 버전 확인
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyAmvzkWK51QZPyLaSg8S_dh72mQXVo3HyA',
  authDomain: 'admin-alaram.firebaseapp.com',
  projectId: 'admin-alaram',
  storageBucket: 'admin-alaram.appspot.com',
  messagingSenderId: '465696956839',
  appId: '1:465696956839:web:eb04602909a4e2c28d5682',
  measurementId: 'G-W3ZZSKBR7F',
};

// Initialize Firebase
// firebase.initializeApp(config);
const app = firebase.initializeApp(config);
const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
