const setting = {
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword',
  },
};

const mailOptions = (fromEmail, toEmail, subject, text) => {
  return {
    from: fromEmail,
    to: toEmail,
    subject,
    text,
  };
};

module.exports = { setting, mailOptions };
