## 개요

Node.JS를 이해하기 위해 해본 줌 클론 코딩.

## 알게된 것

- package.json에서 작성한 scripts `"dev": "nodemon"`가 호출되면 nodemon.js의 코드를 실행한다. nodemon.json에는 server.js가 쓰여 있어서 이것을 실행한다.
- 용어
    * express: 프레임워크. 서버를 실행해 준다.
    * nodemon: 코드를 수정할 때마다 서버를 자동으로 온/오프 해준다. ignore를 통해 해당 파일의 자동 새로고침을 무시할 수도 있다. (예: "ignore": ["src/public/*"])
    * view engine: 서버에서 js로 만든 변수를 보내 클라이언트에서 쓸 수 있도록 하는 엔진.
    * pug: html의 템플릿 엔진. JS를 사용해 HTML을 렌더링 하는 역할. 닫는 태그가 없어서 낯설다.
- HTTP / WebSocket의 차이(프로토콜)
    * HTTP(stateless): 서버는 response를 하면 유저를 잊는다. 그저 매치해주는 역할. 정보를 받기 위해 알맞는 쿠키를 request 하는 것. 해당 쿠기가 있다면 response. 핑퐁처럼 주고 받기. 실시간이 아님. 일방향.
    * WebSocket(stateful): 한 번 연결하면 계속 연결되어 있는다. 서버가 유저를 기억하기에 직접 메시지를 보낼 수도 있다. 양방향
- server.js_socket은 연결된 브라우저, app.js_socket은 연결된 서버
- app.js는 백엔드의 상황을 감지, server.js에서 on은 브라우저 상황을 감지
![image](https://user-images.githubusercontent.com/32091837/209548390-ea488394-be4a-4818-9231-f6aa1794361a.png)


- socketIO의 시작: 매우 짧은 코드로 양방향 소통을 시작할 수 있는 프레임워크.
- 브라우저와 서버의 연결이 끊기면 서버가 계속 재접속을 시도함
- 용어
    * [emit](https://socket.io/docs/v4/emitting-events/#basic-emit): 이벤트 이름을 직접 짓고, 여러 argument를 전송할 수 있음. js object도 보낼 수 있어 굳이 stringify를 해줄 필요도 없음. emit -> on
    * var(.to(param)).emit("eventName"); -> var.on("eventName", param ...) / to로 보내고 on으로 받을 수 있음
    
![flow-1](https://user-images.githubusercontent.com/32091837/210031867-0b098814-0b3e-48f8-8fef-d2c867ad1da7.png)

## 참조

-   https://ninjaggobugi.tistory.com/9
-   https://velog.io/@over/Node.js-View-Engine-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
-   https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-%EC%9B%B9-%EC%86%8C%EC%BC%93-Socket-%EC%97%AD%EC%82%AC%EB%B6%80%ED%84%B0-%EC%A0%95%EB%A6%AC
-   https://hashnode.com/post/web-socket-vs-http-cky8g7b7u0tqt5ns17c9i7j1p
-   https://velog.io/@outclassstudio/WebSocket%EC%9D%B4%EB%9E%80
---
