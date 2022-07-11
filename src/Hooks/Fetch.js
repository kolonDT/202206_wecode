// import { useEffect } from 'react';
// import { useRecoilState } from 'recoil';
// import { fetchDataState } from '../atoms';

export const IP = 'http://10.133.5.8:8000/';

// export const useFetch = url => {
//   const [fetchData, setFetchData] = useRecoilState(fetchDataState);

//   useEffect(() => {
//     fetch(url, {
//       headers: {
//         Authorization: localStorage.getItem('ACCESS_TOKEN'),
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setFetchData(data.results);
//         console.log(data);
//       });
//   }, [url]);

//   return fetchData;
// };
