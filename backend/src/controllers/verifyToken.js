const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    //verifica que exista una cabecera de la petición que tenga el token
    const token = req.headers ['x-access-token'];
    if(!token){
        //si no existe envia mensaje de error
        return res.status(401).json({
            auth:false,
            message:'No token provided'
        });
    }
    //Si existe decodifica el token y reconoce el _id del usuario
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;