const nodemailer = require('nodemailer');

function sendMail(sender, invitedEmails, date, name){
     
     const transport = nodemailer.createTransport({
          service: process.env.MAIL_SERVICE,
          auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASSWORD
          }
     })

     const mailText = `Olá!

${sender} te convidou para participar de ${name}, no dia ${date}, através do AgendaUp.
     
Se você ainda não possui uma conta, crie uma pelo endereço {...}.
     
Até lá!` 

     
     const mailsOptions = {
          from: process.env.MAIL_USER,
          to: invitedEmails,
          subject: `AgendaUp: você foi convidado para um compromisso`,
          text: mailText
     }
     console.log(invitedEmails.length)

     if(invitedEmails.length > 0){
          transport.sendMail(mailsOptions, (error, info) => {
               if(error) console.log(error)
          })
     }else console.log("No emails detected")
}

module.exports = sendMail;