const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path');
const emailConfig = require('../settings/email')

const transport = nodemailer.createTransport(emailConfig)

transport.use('compile', hbs({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/email/template')
    },
    viewPath: path.resolve('./src/email/template'),
    extName: '.html',
}));

module.exports = transport