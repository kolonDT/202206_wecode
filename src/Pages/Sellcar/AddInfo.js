import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { inputTextState } from '../../atoms';
import PhotoCard from './PhotoCard';

const AddInfo = ({ setCarImages, carImages, setThumbnails, thumbnails }) => {
  //주행거리 값 관리하는 상태값
  const [inputValue, setInputValue] = useState('');

  //옵션 값 관리하는 상태값
  const [options, setOptions] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  //옵션 선택 안할 시 버튼 디자인 관리할 상태값
  const [noOption, setNoOption] = useState(false);

  //추가 정보 글 관리 상태값
  const [addInfo, setAddInfo] = useState('');

  //사진 url 관리하는 상태값
  const [carUrlImages, setCarUrlImages] = useState([]);

  let carNumber = localStorage.getItem('carNumber');
  //input에 숫자만 입력 및 세 자리수 마다 콤마 찍는 함수
  const checkNumber = e => {
    const value = e.target.value;
    const onlyNumber = value.replace(/[^0-9]/g, '');
    const commaNumber = onlyNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const intNumber = value.replace(/,/g, '');
    localStorage.setItem(`${carNumber}_driving_distance`, intNumber);
    setInputValue(commaNumber);
  };

  //click시 옵션값 저장하는 함수
  const clickOptions = e => {
    const value = e.target.value;
    const noOptionCheck = Object.keys(options).filter(
      key => options[key] === true
    );
    if (noOptionCheck.length === 1 && noOptionCheck[0] === value) {
      let _options = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      };
      setOptions(_options);
      setNoOption(true);
      localStorage.setItem(`${carNumber}_options`, []);
      return;
    }
    setOptions({ ...options, [value]: !options[value] });
  };

  const noOptionCheck = e => {
    if (e.target.checked) {
      //옵션을 초기화
      let _options = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      };
      setOptions(_options);
      setNoOption(true);
      localStorage.setItem(`${carNumber}_options`, []);
    } else {
      setOptions({ ...options, 1: true });
      setNoOption(false);
    }
  };

  ///추가 정보 글 저장하는 함수
  const writeInfo = e => {
    setAddInfo(e.target.value);
    localStorage.setItem(`${carNumber}_additional_info`, e.target.value);
  };

  // const uploadPhoto = (num, newImage) => {
  //   setCarImages(
  //     carImages.map((car) => (car.index === num ? (car = newImage[0]) : null))
  //   );
  // };

  const tmp = arr => {
    let _options = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    };
    for (let i in arr) {
      _options[arr[i]] = true;
      setOptions(_options);
    }
  };

  const deleteImage = index => {
    setCarImages(prev => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
    setCarUrlImages(prev => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
  };

  //초기에 localStorage에 정보가 있다면 값 넣어주기
  useEffect(() => {
    //주행거리 입력
    const drivingDistance = localStorage.getItem(
      `${carNumber}_driving_distance`
    );
    setInputValue(drivingDistance);

    //옵션 클릭 다루기
    const localOptions = localStorage.getItem(`${carNumber}_options`);
    if (localOptions) {
      if (localOptions.length === 0) {
        setNoOption(true);
      } else {
        const tmp = JSON.parse(localOptions);
        let tmpOption = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        };
        tmp.forEach(element => (tmpOption[element] = true));
        setOptions(tmpOption);
      }
    }
    //추가 정보 입력
    const addInfo = localStorage.getItem(`${carNumber}_additional_info`);
    setAddInfo(addInfo);
  }, []);

  useEffect(() => {
    if (carImages.length !== 0) {
      localStorage.setItem(`${carNumber}_image`, carImages);
    }
  }, [carImages]);

  useEffect(() => {
    if (carImages.length > 4) {
      alert('사진을 4개 이상 초과할 수 없어요');
      carImages.pop();
    }
  }, [carImages]);

  let arr = [];
  useEffect(() => {
    //for문 돌아서 true면 배열에 담기
    for (let i in options) {
      if (options[i] === true) {
        arr.push(i);
        localStorage.setItem(`${carNumber}_options`, JSON.stringify(arr));
      }
    }
  }, [options]);

  // 선택한 색상 정보
  const [selectColor, setSelectColor] = useState('');
  const selectedColor = colorName => {
    colorInput === true && setColorInput(false);
    inputText !== '' && setInputText('');
    setSelectColor(colorName);
  };

  // 직접 입력 선택 시 TEXT AREA ON/OFF
  const [colorInput, setColorInput] = useState(false);
  const showColorInput = () => {
    selectColor !== '' && setSelectColor('');
    setColorInput(prev => !prev);
  };

  // 직접 입력한 색상 정보
  // const [inputText, setInputText] = useState('');
  // const userInputColor = e => {
  //   const userInput = e.target.value;
  //   setInputText(userInput);
  //   setSelectColor(userInput);
  // };

  // recoil test
  const [inputText, setInputText] = useRecoilState(inputTextState);
  const userInputColor = e => {
    const userInput = e.target.value;
    setInputText(userInput);
    setSelectColor(userInput);
  };

  // console.log('inputText', inputText);

  return (
    <InfoContainer>
      <Announcement>
        보다 정확한 견적을 위해
        <br />
        추가 정보를 입력해주세요.
      </Announcement>
      <DrivingDistanceWrapper>
        <Name>주행거리</Name>
        <InputBox>
          <DistanceInput
            placeholder="1,500"
            onChange={e => {
              checkNumber(e);
            }}
            value={inputValue}
          />
          <Measurements>km</Measurements>
        </InputBox>
      </DrivingDistanceWrapper>
      <OptionWrapper>
        <Name>옵션</Name>
        <OptionBox noOption={noOption}>
          <OptionLine>
            <OptionButton
              value={1}
              onClick={clickOptions}
              isClicked={options[1]}
              disabled={noOption ? true : false}
            >
              네비게이션
            </OptionButton>
            <OptionButton
              value={2}
              onClick={clickOptions}
              isClicked={options[2]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              선루프
            </OptionButton>
            <OptionButton
              value={3}
              onClick={clickOptions}
              isClicked={options[3]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              통풍시트
            </OptionButton>
          </OptionLine>
          <OptionLine>
            <OptionButton
              value={4}
              onClick={clickOptions}
              isClicked={options[4]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              디지털키
            </OptionButton>
            <OptionButton
              value={5}
              onClick={clickOptions}
              isClicked={options[5]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              후방카메라
            </OptionButton>
            <OptionButton
              value={6}
              onClick={clickOptions}
              isClicked={options[6]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              블랙박스
            </OptionButton>
          </OptionLine>
        </OptionBox>
        <NoOptionWrapper>
          <NoOptionCheck
            type="checkbox"
            onClick={noOptionCheck}
            checked={noOption}
          />
          <CheckBoxInfo>옵션이 없어요.</CheckBoxInfo>
        </NoOptionWrapper>
      </OptionWrapper>

      <ColorInputContainer InputOpen={colorInput}>
        <Name>색상</Name>
        <ColorChipWrapper>
          {COLOR_CHIP.map(({ id, color, colorName }) => {
            <ColorChip
              id={id}
              color={color}
              colorName={colorName}
              selectColor={selectColor}
              onClick={() => selectedColor(colorName)}
            >
              <span />
              {colorName}
            </ColorChip>;
          })}
          <DirectInputColor onClick={showColorInput} colorInput={colorInput}>
            <span />
            직접입력
          </DirectInputColor>
        </ColorChipWrapper>
        <InputTextWrapper InputOpen={colorInput}>
          <InputTextElement
            onChange={userInputColor}
            value={inputText}
            placeholder="차량 색상을 입력해주세요"
          />
        </InputTextWrapper>
      </ColorInputContainer>

      <AddInfoWrapper>
        <Name>추가 정보</Name>
        <AddInfoBox>
          <InfoInputBox>
            {/* 추가 정보 세분화로 text area 삭제 */}
            {/* <DescriptionInput
              onChange={writeInfo}
              placeholder={`차량 상태, 수리 필요 여부, 보험 이력 등 
              상세한 내용을 알려주세요.`}
              value={addInfo}
            /> */}
            {/* {ADDITIONAL_INFO.map(({ id, typeName, placeholder })=>(
              <InfoType id={id}>
                <TypeName>{typeName}</TypeName>
                <InfoInput placeholder={placeholder} />
              </InfoType>
            ))} */}

            <InfoType>
              <TypeName>차량 상태</TypeName>
              🚗 전반적인 차량 상태에 대해 알려주세요.
              <InputTextElement placeholder="차량 상태에 대해 알려주세요" />
            </InfoType>

            <InfoType>
              <TypeName>수리 필요 여부</TypeName>
              🛠 현재 차량에 수리가 필요한가요?
              <ButtonWrapper>
                <AnswerButton>예</AnswerButton>
                <AnswerButton>아니요</AnswerButton>
              </ButtonWrapper>
              <InputTextElement placeholder="수리가 필요한 부분에 대해 자세히 알려주세요" />
            </InfoType>

            <InfoType>
              <TypeName>보험 이력</TypeName>
              🧑‍⚕️ 보험 처리를 하신 적이 있나요?
              <ButtonWrapper>
                <AnswerButton>예</AnswerButton>
                <AnswerButton>아니요</AnswerButton>
              </ButtonWrapper>
              <InputTextElement placeholder="보험 처리한 부분에 대해 자세히 적어주세요" />
            </InfoType>
          </InfoInputBox>
        </AddInfoBox>
      </AddInfoWrapper>
      <PhotoInputContainer>
        <Name>사진 등록</Name>
        <PhotoInputWrapper>
          <PhotoInputLine>
            {[
              '전면 사진 추가',
              '후면 사진 추가',
              '우측 사진 추가',
              '좌측 사진 추가',
            ].map((value, index) => (
              <PhotoCard
                key={index}
                index={index}
                value={value}
                setCarImages={setCarImages}
                carImages={carImages}
                setThumbnails={setThumbnails}
                thumbnails={thumbnails}
              />
            ))}
          </PhotoInputLine>
        </PhotoInputWrapper>
      </PhotoInputContainer>
    </InfoContainer>
  );
};

// const ADDITIONAL_INFO = [
//   {"id" : 1, "typeName" : "차량 상태", "placeholder" : "차량 상태에 대해 알려주세요 🚗"},
//   {"id" : 1, "typeName" : "수리 필요 여부", "placeholder" : "차량 상태에 대해 알려주세요 🚗"},
//   {"id" : 1, "typeName" : "보험 이력", "placeholder" : "차량 상태에 대해 알려주세요 🚗"},
// ]

const COLOR_CHIP = [
  { id: 1, color: 'white', colorName: '흰색' },
  { id: 2, color: 'silver', colorName: '은색' },
  { id: 3, color: 'gray', colorName: '회색' },
  { id: 4, color: 'black', colorName: '검정색' },
  { id: 5, color: '#006DB2', colorName: '파랑' },
  { id: 6, color: '#D00412', colorName: '빨강' },
];

const AnswerButton = styled.button`
  border: 0;
  padding: 0.8em 1.5em;
  width: fit-content;
  border-radius: 10em;

  &:hover {
    opacity: 0.5;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const DirectInputColor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: small;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  span {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    border: 3px solid #eee;
    margin-bottom: 5px;
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(253, 187, 45, 1) 100%
    );
  }

  ${props =>
    props.colorInput &&
    css`
      color: #9e127b;
      font-weight: 600;

      span {
        border: 3px solid #9e127b;
      }
    `}
`;

const ColorChip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: small;
  margin: 1em 0.5em 0 0;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    opacity: 0.5;
  }

  span {
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
    border: 3px solid #eee;
    margin-bottom: 5px;
    background: ${props => props.color};
  }

  ${props =>
    props.colorName === props.selectColor &&
    css`
      color: #9e127b;
      font-weight: 600;

      span {
        border: 3px solid #9e127b;
      }
    `}
`;

const ColorChipWrapper = styled.div`
  display: flex;
`;

const InputTextElement = styled.input`
  width: 100%;
  margin: 0.8em 0;
  padding: 0;
  border: 0;
  font-size: medium;

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: medium;
  }

  :focus {
    outline: 0px solid black;
  }
`;

const InputTextWrapper = styled.div`
  margin-top: 1.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 640px) {
    width: 19rem;
  }

  height: ${props => (props.InputOpen ? '100%' : '0')};
  opacity: ${props => (props.InputOpen ? '1' : '0')};
  display: ${props => (props.InputOpen ? '' : 'none')};
  margin-bottom: ${props => (props.InputOpen ? '2em' : '0')};
  transition: all 0.5s;
`;

const ColorInputContainer = styled.div`
  width: 100%;
  margin: ${props => (props.InputOpen ? '2.5em 0 3.8em 0' : '2.5em 0')};
  transition: all 0.3s;

  @media only screen and (max-width: 640px) {
    width: 23.4375rem;
  }
`;

const InfoContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  box-sizing: border-box;
  border-top: 1px dotted #adadad;

  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
    padding-left: 0;
  }
`;

const Announcement = styled.h1`
  margin-top: 40px;
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;

const DrivingDistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 1.4em 0;
`;

const Name = styled.span`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
`;

const InputBox = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const DistanceInput = styled.input`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 1em 3px 10px;
  border: 0 solid black;
  font-size: 0.8em;
  font-weight: 600;

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 1.2em;
  }

  :focus {
    outline: 0px solid black;
  }
`;

const Measurements = styled.span`
  padding-right: 7px;
`;

const OptionWrapper = styled.div``;

const OptionLine = styled.div`
  display: flex;
  margin-bottom: 1.4em;

  @media only screen and (max-width: 640px) {
    margin-bottom: 1em;
    width: 23.4375rem;
  }
`;

const OptionBox = styled.div`
  padding: 1em;
  margin-top: 1em;

  @media only screen and (max-width: 640px) {
    padding: 0;
    margin-bottom: 1.8em;
  }
`;

const OptionButton = styled.button`
  padding: 1rem 2rem;
  margin-right: 2rem;
  color: rgba(0, 0, 0, 0.9);
  background-color: white;
  border: 0px solid black;
  border-radius: 1.8em;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.1);

  /* ${({ isClicked }) => {
    return isClicked
      ? `
        padding: 1em 2.2em;
        color: rgba(92,16,73);
        border: 4px solid rgba(92,16,73,0.8);
        cursor: pointer;
        box-shadow:  0px 0px 0px 0px rgba(0, 0, 0, 0.2);
      `
      : null;
  }} */

  @media only screen and (max-width: 640px) {
    margin-right: 1.2em;
    font-size: 1em;
    padding: 0.8em 0.8em;
  }

  @media only screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`;

const NoOptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NoOptionCheck = styled.input`
  display: inline-block;
  width: 20px;
  height: 20px;
  box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.1);
`;

const CheckBoxInfo = styled.span`
  margin-left: 10px;
  font-size: 15px;
`;

const AddInfoWrapper = styled.div`
  margin-top: 20px;
  width: 100%;

  @media only screen and (max-width: 640px) {
    width: 23.4375rem;
  }
`;

const AddInfoBox = styled.div`
  margin-top: 15px;
`;

const InfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoInput = styled.input`
  width: 100%;
  margin-bottom: 1.5em;
  padding: 0.8em;
`;

const TypeName = styled.div`
  color: #5c1049;
  font-weight: 600;
  font-size: medium;
  margin-bottom: 0.5em;
`;

const InfoType = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5em;
`;

// const DescriptionInput = styled.textarea`
//   resize: none;
//   padding: 1rem;
//   border: 2px solid rgba(0, 0, 0, 0.1);
//   white-space: pre-line;
//   @media only screen and (max-width: 640px) {
//     width:17rem;
//   }
//   ::placeholder {
//     color: rgba(0, 0, 0, 0.3);
//     font-size: 1em;
//   }
// `;

const ButtonName = styled.span`
  margin-left: 4px;
`;

const PhotoInputContainer = styled.div`
  margin-top: 1.4em;
`;

const PhotoInputWrapper = styled.div`
  margin-top: 1em;
  border: 2px solid rgba(0, 0, 0, 0.1);
  @media only screen and (max-width: 640px) {
    width: 23.4375rem;
    border: none;
    text-align: center;
    height: 20em;
  }
`;

const PhotoInputLine = styled.div`
  display: flex;
  @media only screen and (max-width: 640px) {
    flex-wrap: wrap;
    text-align: center;
    height: 100%;
    width: 100%;
  }
`;

export default AddInfo;
