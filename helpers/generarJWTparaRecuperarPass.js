import jwt from 'jsonwebtoken';

const generarJWTparaRecuperarPass = (id) => {
    let token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // Obtén los primeros 10 caracteres del token
    token = token.slice(0, 10);

    return token;
}

export default generarJWT;
