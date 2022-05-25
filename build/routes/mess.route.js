"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mess_controller_1 = __importDefault(require("../controllers/mess.controller"));
const express = require("express");
const router = express.Router();
router.post('/', mess_controller_1.default.postMess);
router.get('/:conversationId', mess_controller_1.default.getConvId);
router.post('/create', mess_controller_1.default.postCreateMessage);
// router.post("/v1/create", messController.postSendMessages);
exports.default = router;
