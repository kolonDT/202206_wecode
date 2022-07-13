import firebase from 'firebase';

export async function getToken() {
  if (firebase.messaging.isSupported() === false) {
    console.log('isSupported: ', firebase.messaging.isSupported());
    return null;
  }

  const messaging = firebase.messaging();
  const token = await messaging
    .requestPermission()
    .then(function () {
      return messaging.getToken();
    })
    .then(function (token) {
      messaging.onMessage(payload => {
        alert('알림:' + payload.notification.body);
      });
      return token;
    })
    .catch(function (err) {
      console.debug('에러 : ', err);
      return null;
    });

  console.log('token: ', token);
  return token;
}

useEffect(() => {
  firebaseMessageToken();
}, []);
// async 를 사용학 위해 메서드로 따로 분리함
const firebaseMessageToken = async () => {
  let token = await getToken();
  console.log('token === ', token);
  //추후 서버에 토큰을 저장하는 기능을 여기에 추가
};
