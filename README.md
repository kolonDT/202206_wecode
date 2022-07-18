# Selling my car

> 자동차 번호 입력으로 등록 된 차량 정보와 시세 정보를 불러오며 판매까지 이어지는 서비스를 제공합니다. <br/>
> 접수 된 견적은 관리자 페이지를 통해 지점 별 딜러 배정 및 견적 상태 관리가 가능합니다.

<br/>

<p align="right"> Supported by <a href="https://wecode.co.kr/"><img src="https://raw.githubusercontent.com/NexClipper/exporterhub.io/master/assets/wecode_logo.jpg" width= 120></a></p>

## 📜 Contents
* [Demo Video](https://github.com/kolonDT/202206_wecode#-demo-video)
* [Features](https://github.com/kolonDT/202206_wecode#-features)
* [How to install](https://github.com/kolonDT/202206_wecode#-how-to-install)
* [Need to know](https://github.com/kolonDT/202206_wecode#-need-to-know)
* [Main Service Flow](https://github.com/kolonDT/202206_wecode#-main-service-flow)
* [DataBase Modeling](https://github.com/kolonDT/202206_wecode#-database-modeling)

<br/>

## 🎥 Demo Video

~~

<br/>

## 🔑 Features 
<!--lint disable no-undefined-references-->
* [x] 차량 번호를 통한 회원 확인
* [x] 카카오 로그인 인증 및 회원가입
* [x] 차량 정보 조회
  * [x] DB 내 차량 정보 호출 (car365 api 대체)
  * [x] 차량 시세 조회 및 그래프 출력
* [x] 차량 변동 정보 입력
  * [ ] 차량 사진 압축 업로드
* [x] 개인 정보 입력
  * [ ] 카카오 맵 마커를 이용한 현재 위치 이동
* [x] 내 견적 확인
* [ ] 견적 상태 알림

<br/>

## 🛠 How to install

```
*
```

<br/>

## 💡 Need to know

> ### 2회 차 카카오 로그인 테스트 시
> 1. [카카오 계정 관리](https://accounts.kakao.com/weblogin/account/partner#pageConnectedOpenAppList)에 가입하였던 카카오 계정으로 로그인
> 2. 연결 된 서비스 관리 중 'Wecode_Kolon'을 해제
> 3. 테스트 웹 페이지에서 local storage에 저장되어 있는 정보 삭제
> 4. 내 차 팔기 서비스 카카오 로그인 인증

<br/>

## 🚙 Main Service Flow
<br/>
<img width="909" alt="image" src="https://user-images.githubusercontent.com/97112697/178914034-95d0754b-a354-4a43-bf43-bb4c81c13149.png">
<br/>


## 💾 DataBase Modeling
![2](https://user-images.githubusercontent.com/21071903/171773721-b6c65832-322d-4090-8aae-7dbf142ff070.png)

<br/>
