import 'dotenv/config';
import nodemailer from 'nodemailer';

export const smtpTransport = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
        user: 'ogundareakafayat@gmail.com',
        pass: 'december1203*'
    }
});

export const sendEmail = (subject, message, email) => {
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'ogundareakafayat@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}