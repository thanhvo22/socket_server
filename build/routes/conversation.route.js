"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const conversation_controller_1 = __importDefault(require("../controllers/conversation.controller"));
router.get("/find/:firstUserId/:secondUserId", conversation_controller_1.default.getConvInTwoUser);
router.post('/', conversation_controller_1.default.postConversation);
router.get('/:userId', conversation_controller_1.default.getConvOfUser);
exports.default = router;
