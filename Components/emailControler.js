var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vijayd292@gmail.com',
      pass: 'Vijayd7502537909'
    }
  });
  
  var mailOptions = {
    from: 'vijayd292@gmail.com',
    to: 'vijay@decisionforce.io',
    subject: 'Hello, there?',
    text: 'How are you ?'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });