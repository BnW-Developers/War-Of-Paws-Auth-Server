# War-Of-Paws-Auth-Server

## 개요
![auth](https://github.com/user-attachments/assets/c4eeffd0-a69c-4b7d-b26e-8168261abc4a)

[냥멍대전](https://github.com/BnW-Developers/War-Of-Paws-Game-Server)의 로그인 및 회원가입을 처리하는 독립적인 서버.  
클라이언트는 이 서버를 통해 회원가입, 로그인, 구글 로그인, 토큰 발급 등의 인증 관련 기능을 수행합니다.

- 🕹️ [냥멍대전 게임서버](https://github.com/BnW-Developers/War-Of-Paws-Game-Server)  
- 🔑 [냥멍대전 인증서버](https://github.com/BnW-Developers/War-Of-Paws-Auth-Server)  
- 🎯 [로비-매칭서버](https://github.com/BnW-Developers/War-Of-Paws-Lobby-Matching-Server)  
- 💊 [Nginx-헬퍼 서버](https://github.com/BnW-Developers/Nginx-Helper-Server)  
- ✅ [헬스체크 서버](https://github.com/BnW-Developers/War-Of-Paws-Health-Server)  

---

## 주요 기능
- **회원가입**: 사용자 계정을 생성하고 데이터를 MySQL에 저장.  
- **로그인**: 사용자 인증 및 세션 관리.  
- **구글 로그인**: 구글 ID 토큰을 이용해 사용자 인증 및 세션 관리.  
- **JWT 발급**: 인증 토큰 생성.  

---

## 주요 API

### 1. 회원가입
**POST /register**  
요청 예시:
```json
{
   "username": "example",
   "email": "example@example.com",
   "password": "password123"
}
```
응답 예시:
```json
{
   "success": true,
   "message": "회원가입이 성공적으로 완료되었습니다."
}
```
---

### 2. 로그인
**POST /login**
요청 예시:
```json
{
   "id": "example",
   "password": "password1234"
}
```
응답 예시:
```json
{
   "success": true,
   "message": "로그인 성공",
   "token": "jwt-token",
   "userId": "111"
}
```
---

### 3. 구글 로그인
**POST /google-login***
요청 예시:
```json
{
   "idToken": "google-id-token",
   "name": "password1234",
   "email": "example@example.com"
}
```
응답 예시:
```json
{
   "success": true,
   "message": "로그인 성공",
   "token": "jwt-token",
   "userId": "111"
}
```

---
## 기술 스택

### 기술 스택
<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/Node.js-339933?logo=Node.js&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/Express-000000?logo=Express&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

### 데이터베이스
<img src="https://shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/Redis-DC382D?logo=Redis&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;

### DevOps
<img src="https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
<img src="https://shields.io/badge/GitHub_Actions-2088FF?logo=GitHubActions&logoColor=fff&style=flat-square" style="height : 25px; margin-left : 10px; margin-right : 10px;"/>&nbsp;
