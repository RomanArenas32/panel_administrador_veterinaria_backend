import jwt from 'jsonwebtoken';
import Veterinario from '../models/veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decored = jwt.verify(token, process.env.JWT_SECRET) //verify visualiza el usuario
            req.veterinario = await Veterinario.findById(decored.id).select('-password -__v -token -confirmado'); //.select(-password) trae todas las respuestas a excepcion del password
            return next();
        } catch (error) {
            const err = new Error('Token no valido.')
            return res.status(403).json({ msg: err.message });
        }
    }
    if (!token) {
        const error = new Error('Token invalido o inexistente.')
        res.status(403).json({ msg: error.message });
    }
    next();
};

export default checkAuth;