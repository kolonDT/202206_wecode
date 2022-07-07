import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InputButton, ContentBox, ContentTitle } from './Style';

const Confirm = () => {
  const navigate = useNavigate();
  const goToConfirm = () => {
    navigate('/complete');
    //TO DO : DB POST fetch
  };

  return (
    <ContentBox>
      <ContentTitle>
        입력한 내용을 확인하시고
        <br /> 견적 요청 버튼을 눌러주세요
      </ContentTitle>
      차량정보 : 116거1700 캐스퍼 [더보기]
      <br />
      주행거리 : 12,345 km
      <br />
      선택옵션 : 선루프, 내비게이션 <br />
      추가정보 : 보조키 1개, 없음
      <br />
      사진등록 : 사진, 사진
      <br />
      <InputButton onClick={goToConfirm} variant="primary">
        견적 요청
      </InputButton>
    </ContentBox>
  );
};

export default Confirm;
