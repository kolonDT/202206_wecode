#Image pull for multi-stage build
FROM node:lts-alpine as builder
# 기반이 될 이미지

# app 디렉토리 생성
RUN mkdir -p /data

# 작업디렉토리(default) 설정, 여기에 해도 되는지 여쭤보기
#WORKDIR /usr/src/app
WORKDIR /data
#COPY ./ /data
RUN ls -al /data


## Install packages
# 현재 패키지 설치 정보를 도커 이미지에 복사. package-lock.json도 복사하는 것이 안전.
COPY package*.json ./

## Copy all src files
# 현재 경로에 존재하는 모든 소스파일을 이미지에 복사
COPY src/ src/
COPY public/ public/

# 설치정보를 읽어 들여서 패키지를 설치
RUN yarn add react-is
RUN yarn set version berry
#RUN yarn add eslint-config-react-app

RUN yarn install
RUN yarn build
RUN ls -al /data/build/

## Build for runtime
FROM nginx:alpine

"_Dockerfile" 56L, 1392C                                                                                                                                                                 1,1           Top
#Image pull for multi-stage build
FROM node:lts-alpine as builder
# 기반이 될 이미지

# app 디렉토리 생성
RUN mkdir -p /data

# 작업디렉토리(default) 설정, 여기에 해도 되는지 여쭤보기
#WORKDIR /usr/src/app
WORKDIR /data
#COPY ./ /data
RUN ls -al /data


## Install packages
#Image pull for multi-stage build
FROM node:lts-alpine as builder
# 기반이 될 이미지

# app 디렉토리 생성
RUN mkdir -p /data

# 작업디렉토리(default) 설정, 여기에 해도 되는지 여쭤보기
#WORKDIR /usr/src/app
WORKDIR /data
#COPY ./ /data
RUN ls -al /data


## Install packages
#Image pull for multi-stage build
FROM node:lts-alpine as builder
# 기반이 될 이미지

# app 디렉토리 생성
RUN mkdir -p /data

# 작업디렉토리(default) 설정, 여기에 해도 되는지 여쭤보기
#WORKDIR /usr/src/app
WORKDIR /data
#COPY ./ /data
RUN ls -al /data


## Install packages
RUN yarn set version berry
#RUN yarn add eslint-config-react-app

RUN yarn install
RUN yarn build
RUN ls -al /data/build/

## Build for runtime
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
#RUN rm -rf /etc/nginx/conf.d

COPY --from=builder /data/build /usr/share/nginx/html
#ENV SDFSDFSDFD="VVV"
#ENV ZZZZZZZZ="sdlkfjsdklfj24eowifjlksdflsdnf"
#ENV NGINX_PORT="7777"

# 3000번 포트를 외부에 개방하도록 설정
EXPOSE 3000

# === 도커가 이미지를 빌드할 때의 명렁어
#CMD ["npm", "start"]

# ========== 이미지가 실행됐을 때 처음에 실행될 명령어
