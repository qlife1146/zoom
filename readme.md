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



## 참조

-   https://ninjaggobugi.tistory.com/9
-   https://velog.io/@over/Node.js-View-Engine-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0
-   https://hashnode.com/post/web-socket-vs-http-cky8g7b7u0tqt5ns17c9i7j1p
