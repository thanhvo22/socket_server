"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
router.post('/register', auth_controller_1.default.postRegister);
router.post('/login', auth_controller_1.default.postLogin);
router.put('/change-pass/:id', auth_controller_1.default.updatePassword);
exports.default = router;
