"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_model_1 = __importDefault(require("../models/room.model"));
const express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
const getRooms = async (req, res) => {
    const rooms = await room_model_1.default.find();
    res.json(rooms);
};
const getRoom = async (req, res) => {
    const id = req.params.id;
    const room = await room_model_1.default.findById(id);
    res.cookie("room_id", room.id);
    res.json(room);
};
const postCreateRoom = async (req, res) => {
    console.log("postCreateRoom");
    const { roomName } = req.body;
    const user_id = req.signedCookies.cookie_id;
    console.log(`user id: `, user_id);
    const checkRoom = room_model_1.default.findOne({ roomName });
    if (!checkRoom) {
        const room = await room_model_1.default.create({
            roomName,
            user_id,
        });
        console.log(`room created: ${room}`);
    }
    await room_model_1.default.findOneAndUpdate({ $push: { user_id } });
    io.emit('server-send-rooms', roomName);
    res.sendStatus(200);
};
exports.default = {
    postCreateRoom, getRoom, getRooms
};
