const socket = new WebSocket(`ws://${window.location.host}`);
//backend 접속

//백엔드의 연결이 open일 때 사용하는 listener
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

//백엔드의 message를 받았을 때 사용하는 listener
socket.addEventListener("message", (message) => {
    console.log(`server: ${message.data}`);
});

//백엔드의 연결이 close일 때 사용하는 listener
socket.addEventListener("close", () => {
    console.log("Closed");
});

//백엔드로 보냄
setTimeout(() => {
    socket.send("hello from the browser.");
}, 3000);
