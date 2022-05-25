"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const conversationCTL = {
    //new conv
    postConversation: async (req, res) => {
        const newConversation = new conversation_model_1.default({
            members: [req.body.senderId, req.body.receiverId],
        });
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    //get conv of a user
    getConvOfUser: async (req, res) => {
        try {
            const conversation = await conversation_model_1.default.find({
                members: { $in: [req.params.userId] },
            });
            res.status(200).json(conversation);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // get conv includes two userId
    getConvInTwoUser: async (req, res) => {
        try {
            const conversation = await conversation_model_1.default.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            });
            res.status(200).json(conversation);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};
exports.default = conversationCTL;
