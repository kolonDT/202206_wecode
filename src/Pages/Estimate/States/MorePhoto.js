import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { SubImageState } from '../../../atoms';

const EssentialPhoto = () => {
  const [subImage, setSubImage] = useRecoilState(SubImageState);

  const handleImage = (e, index) => {
    const cur_file = e.target.files[0];
    if (cur_file) {
      setSubImage(oldList => {
        const newList = {
          ...oldList,
          file: oldList.file.map((el, idx) => {
            if (idx === index) {
              return cur_file;
            } else if (el) {
              return el;
            }
          }),
          preview: oldList.preview.map((el, idx) => {
            if (idx === index) {
              return window.URL.createObjectURL(cur_file);
            } else if (el) {
              return el;
            }
          }),
        };
        return newList;
      });
    }
  };

  const deleteImage = index => {
    setSubImage(oldList => {
      const newList = {
        ...oldList,
        file: oldList.file.map((el, idx) =>
          Number(index) !== Number(idx) ? el : 0
        ),
        preview: oldList.preview.map((el, idx) =>
          Number(index) !== Number(idx) ? el : 0
        ),
      };
      return newList;
    });
  };

  return (
    <PhotoWrapper>
      {OrderList.map((item, index) => (
        <ImageContainer key={`order_wrapper_${index}`}>
          <ImageBox
            onChange={e => {
              handleImage(e, index);
            }}
            key={`ImgUploadInput_${index}`}
            id={`main_img_${index}`}
            type="file"
            accept="image/*"
            preview={subImage.preview[index]}
          />
          <DeleteButton onClick={() => deleteImage(index)}>delete</DeleteButton>
        </ImageContainer>
      ))}
    </PhotoWrapper>
  );
};

export default EssentialPhoto;

const PhotoWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100%;
  margin: 1rem 0 3rem 0;
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  flex-wrap: wrap;
  height: fit-content;
  padding-right: 1%;
  &:last-child {
    padding-right: 0;
  }
`;

const DeleteButton = styled.button`
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.3rem;
  background-color: white;
  font-size: small;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ImageBox = styled.input`
  ${({ theme }) => theme.flex.flexBox}
  width: 100%;
  margin: 0 1.5% 1.5% 0;
  padding: 37.5% 0;
  border: 1px solid rgba(8, 94, 214, 0.2);
  border-radius: 0.5rem;
  text-align: center;
  transition: border ease-in-out 150ms;
  cursor: pointer;

  ${({ preview }) => css`
    background-image: url(${preview});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
`;

const OrderList = [
  { index: 1, item: '정면' },
  { index: 2, item: '후면' },
  { index: 3, item: '측면' },
  { index: 4, item: '계기판' },
];
