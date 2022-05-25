"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./config/db.config");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const cors = require("cors");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const mess_route_1 = __importDefault(require("./routes/mess.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const conversation_route_1 = __importDefault(require("./routes/conversation.route"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());
// parse application/json
app.use(bodyParser.json()); //using signed \\ signedCookies
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
db.connect();
app.get("/", (req, res) => {
    //   res.sendFile(__dirname + '/index.html');
    //   res.render("trangchu.ejs");
    res.render("test.ejs");
});
// io.on('connection', (socket) => {
//   console.log("co nguoi da ket noi", socket.id);
//   // console.log(socket.adapter.rooms);
//   socket.on('chat message', msg => {
//     console.log(`${socket.id}`, msg)
//     io.emit('chat message', msg);
//   });
// });
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log("listening on *:3001");
});
// io.on('connection', () =>{
//   console.log('a user is connected')
// })
app.use("/auth", auth_route_1.default);
app.use("/messages", mess_route_1.default);
app.use('/users', user_route_1.default);
app.use("/conversations", conversation_route_1.default);
