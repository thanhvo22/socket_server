"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
router.get('/conversations', user_controller_1.default.getUserInConv);
router.get('/', user_controller_1.default.getAllUsers);
router.get("/:id", user_controller_1.default.getUser);
exports.default = router;
