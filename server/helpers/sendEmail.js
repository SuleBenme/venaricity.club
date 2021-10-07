import nodeMailer from "nodemailer"

export default function sendEmail (emailData) {
    const transporter = nodeMailer.createTransport({
        pool: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "",
            pass: ""
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};