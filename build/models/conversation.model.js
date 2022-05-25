"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    members: {
        type: Array
    }
});
exports.default = (0, mongoose_1.model)("Conversation", conversationSchema);
