import jwt from 'jsonwebtoken';

const generarJWT =(id)=>{
  
    let token = jwt.sign({id }, process.env.JWT_SECRET, {expiresIn: "30d",})

    

    return token;
}


export default generarJWT;