"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    roomName: { type: String },
    user_id: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Account",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Room", roomSchema);
