const setting = {
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const mailActiveForm = (toEmail, text) => {
  return {
    from: process.env.GMAIL_USERNAME,
    to: toEmail,
    subject: 'Kích hoạt tài khoản',
    text: `Kính gửi ${toEmail},

    Chúng tôi nhận được yêu cầu kích hoạt tài khoản của bạn. Để kích hoạt tài khoản của mình, vui lòng nhấp vào liên kết bên dưới:
    
    ${text}

    Nếu bạn không thể nhấp vào liên kết, bạn có thể sao chép và dán nó vào thanh địa chỉ của trình duyệt web.
    Khi bạn nhấp vào liên kết, tài khoản của bạn sẽ được kích hoạt.
    Nếu tài khoản của bạn đã kích hoạt, vui lòng bỏ qua email này.
    
    Trân trọng,`,
  };
};

const mailForwardPasswordForm = (toEmail, text) => {
  return {
    from: process.env.GMAIL_USERNAME,
    to: toEmail,
    subject: 'Lấy lại mật khẩu',
    text: `Kính gửi ${toEmail},

    Chúng tôi nhận được yêu cầu lấy lại mật khẩu cho tài khoản của bạn. Để đặt lại mật khẩu của mình, vui lòng nhấp vào liên kết bên dưới:

    ${text}

    Nếu bạn không thể nhấp vào liên kết, bạn có thể sao chép và dán nó vào thanh địa chỉ của trình duyệt web.
    Khi bạn nhấp vào liên kết, bạn sẽ được đưa đến trang đặt lại mật khẩu. Tại đây, bạn có thể tạo mật khẩu mới cho tài khoản của mình.
    Nếu bạn không yêu cầu lấy lại mật khẩu, vui lòng bỏ qua email này.
    
    Trân trọng,`,
  };
};

module.exports = { setting, mailActiveForm, mailForwardPasswordForm };
