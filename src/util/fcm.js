import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyAmvzkWK51QZPyLaSg8S_dh72mQXVo3HyA',
  authDomain: 'admin-alaram.firebaseapp.com',
  projectId: 'admin-alaram',
  storageBucket: 'admin-alaram.appspot.com',
  messagingSenderId: '465696956839',
  appId: '1:465696956839:web:eb04602909a4e2c28d5682',
  measurementId: 'G-W3ZZSKBR7F',
};

const app = initializeApp(config);
const messaging = getMessaging();

//토큰값 얻기
getToken(messaging, {
  vapidKey:
    'BDVMyokyJKtltmNkgGUS13LGD2wC0ABOINXcakO-n1YXclkkdKuPcw1kuIkEtA-7OCCNpt0KeRUOd5m-mnpzgDQ',
})
  .then(currentToken => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.'
      );
      // ...
    }
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, payload => {
  console.log('Message received. ', payload);
  // ...
});
