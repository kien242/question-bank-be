const setting = {
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const mailOptions = (toEmail, text) => {
  return {
    from: process.env.GMAIL_USERNAME,
    to: toEmail,
    subject: 'Kích hoạt tài khoản',
    text: `Cảm ơn bạn đã đăng ký tài khoản. Để kích hoạt tài khoản của mình, vui lòng nhấp vào liên kết bên dưới: ${text}.\nNếu bạn không thể nhấp vào liên kết, bạn có thể sao chép và dán nó vào thanh địa chỉ của trình duyệt web.`,
  };
};

module.exports = { setting, mailOptions };
