# Selling my car 
> 자동차 번호 입력으로 등록 된 차량 정보와 시세 정보를 불러오며 판매까지 이어지는 서비스를 제공합니다. <br/>
> 접수 된 견적은 관리자 페이지를 통해 지점 별 딜러 배정 및 견적 상태 관리가 가능합니다.

[![Generic badge](https://img.shields.io/badge/wecode-33th-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/PRs-welcome-<COLOR>.svg)](https://shields.io/)
<br/>

<p align="right"> Supported by <a href="https://wecode.co.kr/"><img src="https://raw.githubusercontent.com/NexClipper/exporterhub.io/master/assets/wecode_logo.jpg" width= 120></a></p>

## 📜 Table of Contents
* [Demo Video](https://github.com/kolonDT/202206_wecode#-demo-video)
* [Features](https://github.com/kolonDT/202206_wecode#-features)
* [Contribute Setup](https://github.com/kolonDT/202206_wecode#-contribute-Setup)
* [Need to know](https://github.com/kolonDT/202206_wecode#-need-to-know)
* [Main Service Flow](https://github.com/kolonDT/202206_wecode#-main-service-flow)
* [DataBase Modeling](https://github.com/kolonDT/202206_wecode#-database-modeling)
* [Backend Repository](https://github.com/kolonDT/202206_wecode_api)

<br/>

## 🎥 Demo Video

* 전체 영상을 보려면 gif를 클릭해주세요👇
  [![readme_sample3](https://user-images.githubusercontent.com/97112697/179683290-d65fb42d-3846-438b-9ba6-12df295fd973.gif)](https://youtu.be/)

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
  * [x] 카카오 맵을 이용한 주소 검색 및 입력
  * [ ] 카카오 맵 마커를 이용한 현재 위치 이동
* [x] 내 견적 확인
* [x] 견적 상태 알림

<br/>

## 🛠 Contribute Setup

**main 브런치를 Fork하고, clone 받으세요. 개발을 시작하기 전에 꼭 error 메세지가 없는지 확인하시길 바랍니다!**
> '내 차 팔기 서비스'는 npm 워크스페이스를 사용하므로 npm7을 기준으로 환경을 설정해야 합니다. <br/>
> 하위 버전을 사용하는 경우 패키지 별로 직접 종속성을 설치해야 하니 주의바랍니다.
> 
> 🐳 Coming soon new installation method with Docker ...

```
$ git clone https://github.com/{your-personal-repo}/202206_wecode.git
# install dependencies
$ npm install
# serve with hot reload at localhost:3000
$ npm start
```
### Pull Request
PR을 업로드하기 전에 테스트를 실행하여 오류가 없는지 꼭 확인하세요. 오류가 없으면 commit 후 push하면 됩니다 🥳

<br/>

## 💡 Need to know

### 2회 차 카카오 로그인 테스트 시
1. [카카오 계정 관리](https://accounts.kakao.com/weblogin/account/partner#pageConnectedOpenAppList)에 가입하였던 카카오 계정으로 로그인
2. 연결 된 서비스 관리 중 'Wecode_Kolon'을 해제
3. 테스트 웹 페이지에서 local storage에 저장되어 있는 정보 삭제
4. 내 차 팔기 서비스 카카오 로그인 인증

<br/>

## 🚙 Main Service Flow
<br/>
<p align="center"><img width="640" alt="image" src="https://user-images.githubusercontent.com/97112697/178914034-95d0754b-a354-4a43-bf43-bb4c81c13149.png"><p/>
<br/>


## 💾 DataBase Modeling
<p align="center">
<img width="900" alt="image" src="https://user-images.githubusercontent.com/21071903/171773721-b6c65832-322d-4090-8aae-7dbf142ff070.png">
</p>

<br/>

## 👉 Backend Repository
[백엔드 레포지토리 바로가기](https://github.com/kolonDT/202206_wecode_api)

<br/>

