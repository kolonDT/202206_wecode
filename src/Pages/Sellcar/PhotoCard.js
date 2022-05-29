import React, { useRef, useState } from "react";
import styled from "styled-components";

const PhotoCard = ({ carImages, setCarImages, index, value }) => {
  console.log(index);
  //사진등록 버튼을 누르면 사진 등록할 수 있는 모달창 띄우기
  const clickPhotoInput = (num) => {
    photoInput.current.click();
  };

  const [thumbnail, setThumbnail] = useState();

  //photoInput 버튼 ref
  const photoInput = useRef();

  //사진을 상태값에 저장하는 함수
  const onLoadFile = (e) => {
    const newImage = e.target.files;
    console.log("newImage", newImage[0]);
    setCarImages([...carImages, { order: index, src: newImage[0] }]);
    if (carImages.length < 4) {
      setThumbnail(URL.createObjectURL(newImage[0]));
    }
  };

  return (
    <PhotoInputBox onClick={clickPhotoInput}>
      {thumbnail !== undefined ? <Thumbnail src={thumbnail} /> : <p>{value}</p>}
      <PhotoInput type="file" ref={photoInput} onChange={onLoadFile} />
    </PhotoInputBox>
  );
};

const PhotoInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 10em;
  font-size: 1.1em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    background-color: whitesmoke;
  }
`;

const PhotoInput = styled.input`
  display: none;
`;

const Thumbnail = styled.img`
  overflow: hidden;
`;

export default PhotoCard;
