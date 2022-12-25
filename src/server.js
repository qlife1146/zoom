import express from "express";

const app = express();

app.set("view engine", "pug");
//view engine을 pug로 지정
app.set("views", __dirname + "/views");
//views 디렉토리 설정
app.use("/public", express.static(__dirname + "/public"));
//public 폴더를 유저에게 공개. 웹을 사용할 수 있도록 함
//public 디렉토리 설정. pug에서 js를 import를 하는 게 끝이 아니라 server.js에서 static도 해줘야 한다.

app.get("/", (req, res) => res.render("home"));
//Express: views 설정 및 render. 홈페이지 이동 때 사용될 템플릿을 렌더함
app.get("/*", (req, res) => res.redirect("/"))
//주소 창에 경로를 직접 입력해도 홈으로 되돌리는 기능

// console.log("Hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`);

app.listen(3000, handleListen);
