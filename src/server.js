import http from "http";
// import WebSocket from "ws";
import { Server } from "socket.io";
import express from "express";
import { count } from "console";
import { instrument } from "@socket.io/admin-ui";

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
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});
instrument(wsServer, {
    auth: false,
});

function publicRooms() {
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
    socket["userName"] = "Anonymous";
    socket.onAny((event) => {
        console.log(`socket Event: ${event}`);
    });
    wsServer.sockets.emit("current_rooms");
    socket.on("enter_room", (userName, roomName, done /*, test , testStr*/) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.userName, countRoom(roomName)); //roomName에 있는 사람들에게 모두 전송
        wsServer.sockets.emit("room_change", publicRooms());
        // setTimeout(() => {
        //     done(roomName); //backend가 frontend에게 명령을 내릴 수 있음
        // }, 1000);
        // test("Hello");
        // console.log(testStr);
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye", socket.userName, countRoom(room) - 1);
        });
    });
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });
    socket.on("newMessage", (msg, room, done) => {
        socket.to(room).emit("newMessage", `${socket.userName}: ${msg}`);
        done();
    });
    socket.on("userName", (userName) => (socket["userName"] = userName));
});
// *webSocket server on the http server
// const wss = new WebSocket.Server({ server });
// *webSocket 서버만 사용할 거면 http는 작성하지 않아도 무방. ({}) 안을 비워놔도 무방.

// function handleConnection(socket) {
//     console.log(socket);
//     // -아, 웹 콘솔이 아니라 터미널 콘솔에 뜨는 거였다(find: WebSocket {)
// }
// *server.js의 socket은 연결된 브라우저
// *app.js의 socket은 연결된 서버
//⬇️⬇️⬇️

function onSocketClose() {
    //      //브라우저를 켜고 끄는 것을 터미널에서 확인 가능
    console.log("Disconnected from the Browser❌");
}

// *서버 전체(wss)에서 connection이 발생했을 때(on), 특정 브라우저(socket, 여기선 localhost:3000)의 상태
// const sockets = []; //존재하는 소켓을 담을 가상의 DB
// wss.on("connection", (socket) => {
//     sockets.push(socket); //접속한 브라우저를 socketsDB에 담음]
//     socket["name"] = "ㅇㅇ";

//     socket.on("close", onSocketClose);

//     //브라우저에게 전송
//     socket.send("채팅방에 오신 것을 환영합니다.");
//     // console.log(sockets);

//     socket.on("message", (message) => {
//         const obj = JSON.parse(message); //브라우저에서 받은 string을 js로 변환
//         // sockets.forEach((appData) => appData.send(`${message.toString()}`)); //buffer로 와서 해결하기 위한 toString
//         // sockets.forEach((appData) => appData.send(`${obj.type}`));
//         // if (obj.type === "new_message") {
//         //     sockets.forEach((appData) => appData.send(`${obj.payload}`));
//         // } else if (obj.type === "name") {
//         //     console.log(obj.payload);
//         // }
//         switch (obj.type) {
//             case "new_message":
//                 sockets.forEach((appData) => appData.send(`${socket.name}: ${obj.payload}`));
//                 break;
//             case "name":
//                 socket["name"] = obj.payload;
//                 console.log(obj.payload.toString());
//                 break;
//         }
//     });
// });
// // wss.on("connection", (socket) = > {});
// // *cb: callback.
// // *socket: 연결된 다른 유저(서버 <-연결-> 브라우저)

httpServer.listen(3000, handleListen);
