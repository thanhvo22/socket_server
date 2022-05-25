"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = __importDefault(require("../models/account.model"));
const userController = {
    getAllUsers: async (req, res) => {
        const users = await account_model_1.default.find();
        res.json({
            message: `all users`,
            users,
        });
    },
    getUser: async (req, res) => {
        const user = await account_model_1.default.findById(req.params.id);
        res.json(user);
    },
    getUserInConv: async (req, res) => {
        console.log(`test `);
        const userId = req.query.userId;
        console.log(`userId: ${userId}`);
        const username = req.query.username;
        try {
            const user = userId
                ? await account_model_1.default.findById({ _id: userId })
                : await account_model_1.default.findOne({ email: username });
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
exports.default = userController;
