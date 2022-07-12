import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';

const PhotoCard = ({
  carImages,
  setCarImages,
  index,
  value,
  setThumbnails,
  thumbnails,
}) => {
  //사진등록 버튼을 누르면 사진 등록할 수 있는 모달창 띄우기
  const clickPhotoInput = num => {
    photoInput.current.click();
  };

  const [thumbnail, setThumbnail] = useState('');

  //photoInput 버튼 ref
  const photoInput = useRef();

  //사진을 상태값에 저장하는 함수
  const onLoadFile = e => {
    const newImage = e.target.files;
    let result = carImages;
    result[index] = { order: index, src: newImage[0] };

    // carImages[index] = { order: index, src: newImage[0] };
    setCarImages(result);

    if (carImages.length < 5) {
      setThumbnail(URL.createObjectURL(newImage[0]));
      setThumbnails([...thumbnails, URL.createObjectURL(newImage[0])]);
    }
  };

  //사진을 삭제하는 함수
  const deleteFile = e => {
    e.stopPropagation();
    const isDelete = window.confirm('삭제하시겠습니까?');
    if (isDelete) {
      let result = carImages;
      const deletedCarImages = result.filter(a => {
        return a.order !== index;
      });

      const deletedThumbnails = thumbnails.filter((_, num) => num !== index);
      setThumbnails(deletedThumbnails);
      setCarImages(deletedCarImages);
      // carImages[index] = null;
      setThumbnail('');
    }
  };

  return (
    <PhotoInputBox onClick={clickPhotoInput}>
      {thumbnail !== '' ? (
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
  ${({ theme }) => theme.flex.flexBox}
  border: 1px solid rgba(8, 94, 214, 0.2);
  border-radius: 0.5rem;
  width: 23%;
  margin: 0 1.5% 1.5% 0;
  padding: 11% 0;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: border ease-in-out 150ms;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  }

  @media only screen and (max-width: 640px) {
    font-size: 80%;
  }

  p {
    position: absolute;
    color: rgba(8, 94, 214, 0.5);
    font-weight: 600;
    padding: 0;
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
