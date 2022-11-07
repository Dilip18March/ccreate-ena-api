const nodemailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

module.exports = {
  sendMail: async (email, title, body) => {
    console.log("8 ==>", email, title, body);
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "no-replymailer@mobiloitte.com", // generated ethereal user
          pass: "%FEy=9FF@", // generated ethereal password
        },
      });
      // send mail with defined transport object
      let mailResponse = await transporter.sendMail({
        from: "no-replymailer@mobiloitte.com", // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        text: body,
      });
      // console.log('Mail Response ==>',mailResponse)
      return mailResponse;
    } catch (error) {
      console.log("sendMail Error ==>", error);
    }
  },
};
