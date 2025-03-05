const { mailConfig } = require("../../config");
const mailSender = async (email, title, body) => {
  try {
    // Send emails to users
    let info = await mailConfig.mailSender.sendMail({
      from: 'Smart Parking Team <smartparkingteamexe@outlook.com>',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = mailSender;