const nodeMailer = require("nodemailer");
const SMTPServer = require("smtp-server").SMTPServer;


const sendEmail = async (options) =>{
        const transporter = nodeMailer.createTransport({
            host:  SMTPServer,
            port:  process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            secure: false,
            auth:{
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_APP_PASSWORD,
            }
        })

        const mailOptions ={
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;