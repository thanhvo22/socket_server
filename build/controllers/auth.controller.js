"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = __importDefault(require("../models/account.model"));
const dotenv = __importStar(require("dotenv"));
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail_config_1 = require("../config/sendMail.config");
dotenv.config();
const authController = {
    getLogin: (req, res) => {
        res.render("auth/login.pug");
    },
    getRegister: (req, res) => {
        res.render("auth/register.pug");
    },
    postLogin: async (req, res) => {
        console.log(`login page`);
        const { email, pass } = req.body;
        if (!email || !pass)
            return res.status(400).json({
                success: false,
                message: "email or pass trong ",
            });
        try {
            const emailName = await account_model_1.default.findOne({ email });
            if (!emailName)
                return res.status(400).json({
                    success: false,
                    message: "tai khoan khong co ton tai",
                });
            if (pass != emailName.pass)
                return res.status(400).json({
                    success: false,
                    message: "mat khau or tai khoan k dung",
                });
            res.cookie("cookie_id", emailName.id, {
                signed: true,
            });
            res.json({ emailName });
            // res.redirect("/product");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "error",
            });
        }
    },
    postRegister: async (req, res) => {
        console.log("postRegister");
        const { email } = req.body;
        const pass = "123456";
        if (!email)
            return res.status(400).json({
                success: false,
                message: "email trong ",
            });
        try {
            const emailName = await account_model_1.default.findOne({ email });
            if (emailName)
                return res.status(400).json({
                    success: false,
                    message: "email da ton tai",
                });
            const newAccount = await account_model_1.default.create({
                email,
                pass,
            });
            (0, sendMail_config_1.sendMail)({
                to: email,
                from: "support@6weeks.vn",
                subject: "Sending with SendGrid is Fun",
                text: "password with email address is: 123456 . after login please change password",
            });
            res.json(newAccount);
            // res.render("auth/login");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error,
            });
        }
    },
    updatePassword: async (req, res) => {
        // const id = req.singedCookies.cookie_id;
        console.log("updatePassword");
        const id = req.params.id;
        const account = await account_model_1.default.findById(id);
        console.log("updatePassword", account);
        const { passOld, passNew, passFinal } = req.body;
        console.log(passOld, passNew, passFinal);
        if (passOld !== (account === null || account === void 0 ? void 0 : account.pass)) {
            res.status(403).json({
                message: "Pass false"
            });
        }
        if (passNew === passOld) {
            res.status(403).json({
                message: "mat khau phai thay doi!!!!"
            });
        }
        if (passFinal === passNew) {
            const newAccount = await account_model_1.default.findByIdAndUpdate(id, { pass: passNew });
            res.json(newAccount);
        }
    },
    deleteLogin: (req, res) => {
        res.clearCookie("cookie_id");
        res.redirect("/auth/login");
    },
};
exports.default = authController;
