const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
// const userRoute = require('./user');
// const token = require("./user")


function sendEmail(email, name, token){
    
    const mailAccountUser = 'ogunmefunanjola@gmail.com'
    const mailAccountPassword = 'tomilayo'

    const fromEmailAddress = 'ogunmefunanjola@gmail.com'
    const toEmailAddress = email

    const transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
    }))
    
    const mail = {
        from: fromEmailAddress,
        to: toEmailAddress,
        subject: "Welcome to Portfolio Management Company",
        text: `Dear ${name},
               The Portfolio Managing company PMC, would like to invite you onboard our management system as we have been notified of your interest and need for our services.
               We look forward to handling your delicate data with utmost care and discretion. Kindly click on the link below to complete your registration process;
                https://xd.adobe.com/view?token=${token}&email=${email}/`
    }
    
    

    return transport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log(`Message sent to ${name}`);
        }
    
        transport.close();
    });

}

module.exports = sendEmail;
