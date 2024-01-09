# 💪Workout Web App Project 2.0 With React 🏋️‍♂️

앞서 만든 Vanilla JS Web-App 프로젝트 [Web-App With VanillaJS](https://github.com/CSKIM999/Customizing-WorkoutApp.Project) ver_1.0 를  
React, Redux 그리고 MongoDB 를 활용하여 재구성한 프로젝트입니다.

## PROJECT URL 👀👍 👉[Web App Project ver 2.0 with React](https://cskim999.github.io/Workout_WebApp.Project_2.0-With-React/)👈

테스트 아이디 ( ID :: test@te.st // PW :: 1234 ) 를 통해 접속하는 경우 간단한 가이드 컨텐츠가 저장되어있으며  
모바일 환경에서 보시면 더욱 보기 편합니다.

---

### <div align='center'>USED STACKS

<div align='center'><img src="https://img.shields.io/badge/react.js-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> <img src="https://img.shields.io/badge/CRA-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/JS-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img  src="https://img.shields.io/badge/Adobe color-FF0000?style=for-the-badge&logo=adobe&logoColor=white"> <img  src="https://img.shields.io/badge/Github_Page-181717?style=for-the-badge&logo=github&logoColor=white">

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/JWT-47A248?style=for-the-badge&logo=jsonwebtokens&logoColor=white"> <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img  src="https://img.shields.io/badge/oracle Cloud-F80000?style=for-the-badge&logo=oracle&logoColor=white"> <img  src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white"> <img  src="https://img.shields.io/badge/Let's Encrypt-003A70?style=for-the-badge&logo=Let's Encrypt&logoColor=white"></div>

---

## _why?_ 🙄

수학 공식을 외우는 것과 그것을 활용하는 것은 다르듯,  
코드를 따라 치며 배우는 것과 그것을 활용하는 것은 다르다는 것이 저의 생각입니다.

가이드라인 없이 원하는 것을 구현하며 기술을 체화하기 위해 평소에 사용하던 운동 보조 어플리케이션을 재구성했습니다.

## _what?_ 🤷‍♂️

앞선 Vanilla JS 프로젝트의 가장 큰 문제점은 Back-End 를 고려하지 않은 반쪽짜리 프로젝트라는 점 입니다.  
따라서 이번 프로젝트에서는 Back-End 또한 구현하여 온전한 하나의 프로젝트를 구현하고자 했습니다.  
앞선 프로젝트를 개선한다는 의미로서 버전 2.0 로 명명한 이 프로젝트의 달라진 점은 다음과 같습니다.

1. _React 라이브러리 사용_
2. _Redux 를 사용한 상태관리_
3. _MUI 를 사용한 조금 더 나은 UI_
4. _Node.js,Express 그리고 Axios 를 통한 Backend 구현_
5. _ORACLE CLOUD 서버 & SSL인증 https 통신_

## _How?_ 👨‍🔧

### <div align='center'>_Front-End Stack_ 👏

<div align='center'><img src="https://img.shields.io/badge/react.js-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> <img src="https://img.shields.io/badge/CRA-09D3AC?style=for-the-badge&logo=createreactapp&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/JS-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img  src="https://img.shields.io/badge/Adobe color-FF0000?style=for-the-badge&logo=adobe&logoColor=white"> <img  src="https://img.shields.io/badge/Github_Page-181717?style=for-the-badge&logo=github&logoColor=white"></div>

- CRA 를 통한 개발환경 구축
- http-proxy-middleware 라이브러리 사용을 통해 개발 단계 CORS 회피, 배포 단계에선 cors 미들웨어 설정을 통해 회피했습니다.
- ver_1.0 이 MVC 패턴의 SPA 였으나, 로그인 유저만 사용할 수 있도록 인증 (Auth) 절차 추가를 위해 비로그인 유저를 Login/Regist 유도하기 위해 /front 페이지로 라우팅 했습니다.
- 규모가 큰 App 이 아니어서Context API 혹은 심지어 props drilling 으로도 상태관리가 가능하다고 생각했으나, 실습 차원에서 Redux 를 선택했습니다.
- ver_1.0 에서 css 사용에만 약 2주의 시간을 소요했으나, 결과물은 그 만큼의 만족감은 없었습니다. 따라서 더 나은 디자인과 개발속도를 위해 UI 라이브러리 사용했습니다.
- 참고 자료에선 Ant-Design 라이브러리를 사용했으나, 가장 대중적이라고 하는(maybe...?) MUI 를 사용하고자 선택했습니다.
- Githut-Page 의 참 고마운 front-end https 통신설정
- 참고 어플이 있었지만 재구성인 만큼, 새로운 디자인을 위해 보색을 사용하여 웹접근성표준(WCAG) AA 레벨을 준수하는 Primary,Secondary 브랜드 컬러를 새롭게 설정하고, 그레이 스케일 또한 고려해 보았습니다.

---

### <div align='center'>_Back-End Stack_ 🙇‍♂️

<div align='center'><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/JWT-47A248?style=for-the-badge&logo=jsonwebtokens&logoColor=white"> <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

<img src="https://img.shields.io/badge/Ubuntu server-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"> <img  src="https://img.shields.io/badge/oracle Cloud-F80000?style=for-the-badge&logo=oracle&logoColor=white"> <img  src="https://img.shields.io/badge/pm2-2B037A?style=for-the-badge&logo=pm2&logoColor=white"> <img  src="https://img.shields.io/badge/Let's Encrypt-003A70?style=for-the-badge&logo=Let's Encrypt&logoColor=white"></div>

- Node.js 와 MongoDB 를 연결하기 위해 mongoose ODM 사용.
- bycrypt Salt 를 통한 DB정보 암호화 (비밀번호)
- JWT 로그인 토큰정보를 cookie 에 저장, 쿠키를 사용하지 않는 Native 환경에서는 Redux-persist를 활용하여 GET 요청의 헤더에 파라미터로 건네주도록 했습니다.
- DB 내 User data 에서 현재 토큰 정보를 하는 것으로 로그인 여부 확인
- 프로젝트는 내가 서버를 켰을때 뿐만 아니라 언제든 접근해서 볼 수 있어야 온전한 프로젝트라고 생각하여 흔히들 사용하는 Heroku 를 사용하고자 했습니다.
- 하지만 배포를 앞두고 22년 말 부로 Heroku 의 Free tier 가 없어진다는 기사를 접하여 급하게 Ubuntu 기반 ORACLE Cloud 로 선회했습니다.
- OCI( Oracle Cloud Infrastructure) 에 등록된 개인 도메인을 Let's Encrypt 를 통한 SSL 인증으로 back-end https 통신설정

---

##### 이 프로젝트를 진행하며 역시나 배우던 것과 실제 사용하는 것 사이에는 간극이 있고 그 과정에서 또 많이 배울 수 있었다.

##### 특히나 함수형 컴포넌트를 사용하며 React-Hooks 의 편리함에 혀를 내두르고, 브랜드 컬러, 그레이 스케일, WCAG 등 UI 를 공부해보며 적절하고 디테일한 디자인이 주는 높은 UX 에 대해서 다시금 생각하게 되었다.

##### 또한 클라우드 서비스를 사용해보며 자의 반 타의 반으로 리눅스 서버 환경을 접해보게 되었는데 이로 인해 접한 도메인, SSL 인증, 클라우드 인스턴스 환경등이 너무 뜻 깊었다.

##### 아쉬운점 이라면 최적화에 대한 아쉬움이 남는다. 조금 더 디테일하게 디자인했다면 중복되는 내용을 더 최소화 하고 불필요한 연산을 줄일 수 있었지 않을까 싶다.
