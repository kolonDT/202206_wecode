import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";

function MapInfo({ addr, setAddr, postcodeAddr }) {
  const [coords, setCoords] = useState();
  const [state, setState] = useState({
    center: {
      lat: 37.49929244623464,
      lng: 127.0293917149315,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (postcodeAddr !== undefined) {
      AddrToMap(postcodeAddr, setCoords, coords);
      console.log(coords);
    }
  }, [postcodeAddr]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat =
          coords !== undefined ? coords.getLat() : position.coords.latitude;
        let lng =
          coords !== undefined ? coords.getLng() : position.coords.longitude;
        console.log("lat, lng :", lat, lng, coords);
        getAddr(lat, lng, setAddr);
        setState((prev) => ({
          ...prev,
          center: {
            lat: lat,
            lng: lng, // 경도
          },
          isLoading: false,
        }));
      },
      (err) => {
        setState((prev) => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
        }));
      }
    );
  }, [coords, postcodeAddr]);

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

function AddrToMap(postcodeAddr, setCoords, coords) {
  const { kakao } = window;
  let geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(postcodeAddr, function (result, status) {
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

  let carNumber = localStorage.getItem("carNumber");
  localStorage.setItem(`${carNumber}_lng`, coord.getLng());
  localStorage.setItem(`${carNumber}_lat`, coord.getLat());
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
export default MapInfo;
