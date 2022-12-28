import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
// *view engine을 pug로 지정
app.set("views", __dirname + "/views");
// *views 디렉토리 설정
app.use("/public", express.static(__dirname + "/public"));
// *public 폴더를 유저에게 공개. 웹을 사용할 수 있도록 함
// *public 디렉토리 설정. pug에서 js를 import를 하는 게 끝이 아니라 server.js에서 static도 해줘야 한다.

// *Express: views 설정 및 render. 홈페이지 이동 때 사용될 템플릿을 렌더함
app.get("/", (req, res) => res.render("home"));
// url 선언, 유저가 url로 가면 req와 res를 받고 response
app.get("/*", (req, res) => res.redirect("/"));
// *주소 창에 경로를 직접 입력해도 홈으로 되돌리는 기능

// console.log("Hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//can use ws:// too

// *app.listen(3000, handleListen);
//http server using express.js
const server = http.createServer(app);
// *webSocket server on the http server
const wss = new WebSocket.Server({ server });
// *webSocket 서버만 사용할 거면 http는 작성하지 않아도 무방. ({}) 안을 비워놔도 모방.

// function handleConnection(socket) {
//     console.log(socket);
//     // -아, 웹 콘솔이 아니라 터미널 콘솔에 뜨는 거였다(find: WebSocket {)
// }
// *server.js의 socket은 연결된 브라우저
// *app.js의 socket은 연결된 서버
//⬇️⬇️⬇️

//존재하는 소켓을 담을 가상의 DB
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket); //접속한 브라우저를 socketsDB에 담음
    // *서버 전체(wss)에서 connection이 발생했을 때(on), 특정 브라우저(socket, 여기선 localhost:3000)의 상태를 보기 위함
    console.log(`Connected to Browser ✅`);
    socket.on("close", () => {
        console.log("Disconnected from the Browser❌");
    });
    //브라우저를 켜고 끄는 것을 터미널에서 확인 가능

    socket.send("채팅방에 오신 것을 환영합니다.");
    //브라우저에게 전송

    socket.on("message", (message) => {
        // const obj = JSON.parse(message);
        sockets.forEach((appData) => appData.send(`${message.toString()}`)); //buffer로 와서 해결하기 위한 toString
    });
});
// wss.on("connection", (socket) = > {});
// *cb: callback.
// *socket: 연결된 다른 유저(서버 <-연결-> 브라우저)

server.listen(3000, handleListen);
