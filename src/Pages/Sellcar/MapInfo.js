import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";

function MapInfo({ addr, setAddr, detailAddr }) {
  const [coords, setCoords] = useState();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (detailAddr !== undefined) {
      AddrToMap(detailAddr, setCoords, coords);
    }
  }, [detailAddr]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat:
                coords !== undefined
                  ? coords.getLat()
                  : position.coords.latitude, // 위도
              lng:
                coords !== undefined
                  ? coords.getLng()
                  : position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          getAddr(position.coords.latitude, position.coords.longitude, setAddr);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없습니다.",
        isLoading: false,
      }));
    }
  }, [coords]);

  return (
    <>
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "450px",
        }}
        level={3}
      >
        {!state.isLoading && <MapMarker position={state.center}></MapMarker>}
      </Map>
    </>
  );
}

function AddrToMap(detailAddr, setCoords, coords) {
  const { kakao } = window;
  let geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(detailAddr, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      setCoords(coords);
    }
  });
}

function getAddr(lat, lng, setAddr) {
  const { kakao } = window;
  let geocoder = new kakao.maps.services.Geocoder();
  let coord = new kakao.maps.LatLng(lat, lng);
  let callback = function (result, status) {
    if (
      status === kakao.maps.services.Status.OK &&
      result[0].hasOwnProperty("address")
    ) {
      setAddr(result[0].address.address_name);
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
export default MapInfo;
