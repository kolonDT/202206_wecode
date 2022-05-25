import React, { useEffect, useRef, useState, useTransition } from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const AddInfo = () => {
  //주행거리 값 관리하는 상태값
  const [inputValue, setInputValue] = useState("");

  //옵션 값 관리하는 상태값
  const [options, setOptions] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  //옵션 선택 안할 시 버튼 디자인 관리할 상태값
  const [noOption, setNoOption] = useState(false);

  //추가 정보 글 관리 상태값
  const [addInfo, setAddInfo] = useState("");

  //사진 관리하는 상태값
  const [carImages, setCarImages] = useState([]);

  //사진 url 관리하는 상태값
  const [carUrlImages, setCarUrlImages] = useState([]);

  //삭제 hover를 관리하는 상태값
  const [isHoverDelete, setIsHoverDelete] = useState(false);

  //photoInput 버튼 ref
  const photoInput = useRef();

  //input에 숫자만 입력 및 세 자리수 마다 콤마 찍는 함수
  const checkNumber = (e) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const commaNumber = onlyNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputValue(commaNumber);
    localStorage.setItem("driving_distance", commaNumber);
  };

  //click시 옵션값 저장하는 함수
  const clickOptions = (e) => {
    const value = e.target.value;
    setOptions({ ...options, [value]: !options[value] });
  };

  const noOptionCheck = (e) => {
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
      localStorage.setItem("options", []);
    } else {
      setNoOption(false);
    }
  };

  //사진등록 버튼을 누르면 사진 등록할 수 있는 모달창 띄우기
  const clickPhotoInput = () => {
    photoInput.current.click();
  };

  ///추가 정보 글 저장하는 함수
  const writeInfo = (e) => {
    setAddInfo(e.target.value);
    localStorage.setItem("additional_info", e.target.value);
  };

  //사진을 상태값에 저장하는 함수
  const onLoadFile = (e) => {
    const newImage = e.target.files;
    setCarImages([...carImages, newImage[0]]);
    if (carImages.length < 4) {
      const newURL = URL.createObjectURL(newImage[0]);
      setCarUrlImages([...carUrlImages, newURL]);
    }
  };

  const tmp = (arr) => {
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

  const deleteImage = (index) => {
    setCarImages((prev) => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
    setCarUrlImages((prev) => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr;
    });
  };

  //초기에 localStorage에 정보가 있다면 값 넣어주기
  useEffect(() => {
    //주행거리 입력
    const drivingDistance = localStorage.getItem("driving_distance");
    setInputValue(drivingDistance);

    //옵션 클릭 다루기

    const localOptions = localStorage.getItem("options");
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
        tmp.forEach((element) => (tmpOption[element] = true));
        setOptions(tmpOption);
      }
    }
    //추가 정보 입력
    const addInfo = localStorage.getItem("additional_info");
    setAddInfo(addInfo);
  }, []);

  useEffect(() => {
    if (carImages.length !== 0) {
      localStorage.setItem("image", carImages);
    }
  }, [carImages]);

  useEffect(() => {
    if (carImages.length > 4) {
      alert("사진을 4개 이상 초과할 수 없어요");
      carImages.pop();
    }
  }, [carImages]);

  let arr = [];
  useEffect(() => {
    //for문 돌아서 true면 배열에 담기
    for (let i in options) {
      if (options[i] === true) {
        arr.push(i);
        localStorage.setItem("options", JSON.stringify(arr));
      }
    }
  }, [options]);

  return (
    <InfoContainer>
      <Announcement>
        보다 정확한 견적을 위해
        <br />
        추가 정보를 입력해주세요
      </Announcement>
      <DrivingDistanceWrapper>
        <Name>주행거리</Name>
        <InputBox>
          <DistanceInput
            placeholder="1,500"
            onChange={(e) => checkNumber(e)}
            value={inputValue}
          />
          <Measurements>km</Measurements>
        </InputBox>
      </DrivingDistanceWrapper>
      <OptionWrapper>
        <Name>옵션</Name>
        <OptionBox>
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
              옵션명
            </OptionButton>
            <OptionButton
              value={6}
              onClick={clickOptions}
              isClicked={options[6]}
              noOption={noOption}
              disabled={noOption ? true : false}
            >
              옵션명
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
      <AddInfoWrapper>
        <Name>추가 정보</Name>
        <AddInfoBox>
          <InfoInputBox>
            <ThumbnailBox>
              <ThumbnailLine>
                {carUrlImages.map((imageSrc, index) => (
                  <Thumbnail key={index}>
                    <DeleteLayer key={index}>
                      <DeleteButton
                        key={index}
                        onClick={() => {
                          deleteImage(index);
                        }}
                      >
                        삭제
                      </DeleteButton>
                    </DeleteLayer>
                    <CarImage src={imageSrc} index={index} />
                  </Thumbnail>
                ))}
              </ThumbnailLine>
            </ThumbnailBox>
            <DescriptionInput
              onChange={writeInfo}
              placeholder="차량 상태, 수리 필요 여부, 보험 이력 등 상세한 내용을 알려주세요."
              value={addInfo}
            />
            <SelectButton onClick={clickPhotoInput}>
              <AiOutlinePlus />
              <ButtonName>사진 등록</ButtonName>
            </SelectButton>
            <PhotoInput type="file" ref={photoInput} onChange={onLoadFile} />
          </InfoInputBox>
        </AddInfoBox>
      </AddInfoWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
    padding-left: 0;
  }
`;

const Announcement = styled.h1`
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
  margin-bottom: 1.4em;
  @media only screen and (max-width: 640px) {
    margin-bottom: 1em;
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
  padding: 1.2em 2.4em;
  margin-right: 2em;
  color: rgba(0, 0, 0, 0.8);
  background-color: white;
  border: 0px solid black;
  border-radius: 1.8em;
  font-size: 1.1em;
  font-weight: 600;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.1);
  ${({ isClicked }) => {
    return isClicked
      ? `
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
        box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      `
      : null;
  }}
  @media only screen and (max-width: 640px) {
    margin-right: 1.2em;
    font-size: 1em;
    padding: 0.8em 0.8em;
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
    width: 100%;
  }
`;

const AddInfoBox = styled.div`
  margin-top: 15px;
`;

const InfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThumbnailBox = styled.div``;

const ThumbnailLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7em;
  @media only screen and (max-width: 640px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media only screen and (max-width: 640px) {
    width: 35%;
    height: 10em;
    margin: 0 auto;
    margin-bottom: 3px;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

const DeleteLayer = styled.div`
  visibility: hidden;
  ${Thumbnail}:hover & {
    visibility: visible;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const DeleteButton = styled.div`
  width: 40%;
  padding: 1rem;
  color: lightgray;
  text-align: center;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.2rem;
  border-radius: 1em;
  background-color: rgba(0, 0, 0, 0.8);
  :hover {
    cursor: pointer;
    background-color: white;
    color: darkgray;
  }
`;

const CarImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const DescriptionInput = styled.input`
  padding: 3em;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
    font-size: 1em;
  }
`;

const SelectButton = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const ButtonName = styled.span`
  margin-left: 4px;
`;

const PhotoInput = styled.input`
  display: none;
`;

export default AddInfo;
