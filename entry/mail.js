const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



function sendEmail(email){
    
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
        subject: "Testing email sending",
        text: `Dear Micheal,
               I am writing this mail to update you on the progress we are making. Although I still need to work on how to require the email sent in the req.body into the email code
               but for this, i had to manually input the email address.
               Kindly tell we what you think about it. While at that, this is just some random link; https://github.com/wordaddict/hr-backend/tree/development`
    }
    
    

    return transport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    
        transport.close();
    });

}

module.exports = sendEmail;
