'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendEmail = exports.smtpTransport = undefined;

require('dotenv/config');

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smtpTransport = exports.smtpTransport = _nodemailer2.default.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
        user: 'ogundareakafayat@gmail.com',
        pass: 'december1203*'
    }
});

var sendEmail = exports.sendEmail = function sendEmail(subject, message, email) {
    // setup email data with unicode symbols
    var mailOptions = {
        from: 'ogundareakafayat@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: message // plain text body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', _nodemailer2.default.getTestMessageUrl(info));
    });
};