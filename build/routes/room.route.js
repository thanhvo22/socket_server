"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const express = require("express");
const router = express.Router();
router.get('/', room_controller_1.default.getRooms);
router.get('/:id', room_controller_1.default.getRoom);
router.post('/create', room_controller_1.default.postCreateRoom);
exports.default = router;
