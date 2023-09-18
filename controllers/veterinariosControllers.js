import Veterinario from "../models/veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePass from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
    const { email, nombre } = req.body;
    //validar si el veterinario existe
    const existeUsuario = await Veterinario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message })
    }
    try {
        //guardar en la db
        const veterinario = new Veterinario(req.body);

        const veterinarioGuardado = await veterinario.save();

        //enviar el email 
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error)
    }
}

const perfil = (req, res) => {

    const { veterinario } = req
    
    res.json({
        veterinario
    })
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmado = await Veterinario.findOne({ token })

    if (!usuarioConfirmado) {
        const error = new Error('Token no valido! Contacte al adsministrador')
        return res.status(404).json({
            msg: error.message
        })
    }
    try {
        usuarioConfirmado.token = null;
        usuarioConfirmado.confirmado = true
        res.status(200).json({
            msg: 'Cuenta confirmada correctamente',
            usuarioConfirmado
        })
        await usuarioConfirmado.save();
    } catch (error) {
        console.log(error)
    }
}


const autenticar = async (req, res) => {
    const { email, password } = req.body

    //coomprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });
    console.log(usuario)
    if (!usuario) {
        const error = new Error('USUARIO Y/O CONTRASEÑA INCORRECTAS')
        return res.status(403).json({
            msg: error.message
        })
    }
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(408).json({
            msg: error.message
        })
    }
    //comprobar el password con el metodo del modelo veterinario
    if (await usuario.comprobarPassword(password)) {
        
        return res.status(200).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            web: usuario.web,
            telefono: usuario.telefono,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(403).json({
            msg: error.message
        })
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email });

    if (!existeVeterinario) {
        const error = new Error('Este usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    try {
        existeVeterinario.token = generarJWT(existeVeterinario._id);
        await existeVeterinario.save();

        //enviar email
        //enviar el email 
        emailOlvidePass({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });

        return res.status(200).json({ msg: 'Te hemos enviado un correo electronico para recuperar tu contraseña' })
    } catch (error) {
        const e = new Error('El token no se pudo verificar correctamente. Contacte al administrador')
        return res.json({ msg: e.message })
    }

}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    if (tokenValido) {
        return res.json({
            msg: 'Token valido el usuario existe'
        })
    }
    else {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message })
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
        const error = new Error('Error al recuperar su contraseña');
        return res.status(400).json({ msg: error.message })
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();

        res.status(201).json({
            msg: 'Contraseña actualizada correctamente'
        })
    } catch (error) {
        const err = new Error('Error al guardar su contraseña. Contacte con el administrador');
        return res.status(400).json({ msg: err.message })
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
};