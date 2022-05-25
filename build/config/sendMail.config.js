"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log("message sent successfully");
    }
    catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};
exports.sendMail = sendMail;
