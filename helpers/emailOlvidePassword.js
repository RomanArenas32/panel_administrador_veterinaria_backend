import nodemailer from 'nodemailer';


const emailOlvidePass = async(datos) => {
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos;

    const info = await transport.sendMail({
        from: "APV - Administrador de pacientes",
        to: email,
        subject: "Restablecer contraseña",
        text: "Restablecer contraseña",
        html: `<p>Hola! ${nombre} estas a punto de reestablecer tu contraseña.
            <p>Ingresa en el siguiente enlace para continuar:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer contraseña</a></p>
            <p>Si no fuiste vos, ignora este mensaje</p>
        `
    });

    console.log("Mensaje enviado ", info.messageId)
}

export default emailOlvidePass;