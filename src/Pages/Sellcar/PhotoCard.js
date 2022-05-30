import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

const PhotoCard = ({
  carImages,
  setCarImages,
  index,
  value,
  setThumbnails,
  thumbnails,
}) => {
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
    carImages[index] = { order: index, src: newImage[0] };
    if (carImages.length < 4) {
      setThumbnail(URL.createObjectURL(newImage[0]));
      setThumbnails([...thumbnails, URL.createObjectURL(newImage[0])]);
    }
  };

  //사진을 삭제하는 함수
  const deleteFile = (e) => {
    e.stopPropagation();
    const isDelete = window.confirm("삭제하시겠습니까?");
    if (isDelete) {
      carImages[index] = null;
      setThumbnail(undefined);
    }
  };

  console.log(carImages);
  return (
    <PhotoInputBox onClick={clickPhotoInput}>
      {thumbnail !== undefined ? (
        <ThumbnailBox>
          <Thumbnail src={thumbnail} />
          <DeleteIcon>
            <TiDeleteOutline size={25} color="gray" onClick={deleteFile} />
          </DeleteIcon>
        </ThumbnailBox>
      ) : (
        <p>{value}</p>
      )}
      <PhotoInput type="file" ref={photoInput} onChange={onLoadFile} />
    </PhotoInputBox>
  );
};

const PhotoInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12em;
  height: 10em;
  font-size: 1.1em;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  :hover {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
    background-color: whitesmoke;
  }
  @media only screen and (max-width: 640px) {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 9.7em;
    height: 9em;
  }
`;

const PhotoInput = styled.input`
  display: none;
`;

const ThumbnailBox = styled.div``;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default PhotoCard;
