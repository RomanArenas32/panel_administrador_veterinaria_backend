import nodemailer from 'nodemailer';


const emailRegistro = async(datos) => {
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
        subject: "comprueba tu cuenta",
        text: "comprueba tu cuenta",
        html: `<p>Hola! ${nombre} estas a punto de confirmar tu cuenta para comenzar a administrar tus pacientes en el programa
            <p>Ingresa en el siguiente enlace para continuar:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> comprobar cuenta</a></p>
            <p>Si no fuiste vos, ignora este mensaje</p>
        `
    });

    console.log("Mensaje enviado ", info.messageId)
}

export default emailRegistro;