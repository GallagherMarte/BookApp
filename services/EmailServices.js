const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 587,
    auth:{
        user: "elianlava10@gmail.com",
        pass: "icgv rlxn bgzy mirj"
    },
    tls:{
        rejectUnauthorized:false
    }

});

module.exports = transporter;