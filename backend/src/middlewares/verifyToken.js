const jwt = require('jsonwebtoken');
const User = require('../models/users');

function verifyToken (req, res, next) {
    try {
        //verifica que exista una cabecera de la petición que tenga el token
        const token = req.headers ['x-access-token'];
        //si no existe envia mensaje de error
        if(!token) return res.status(403).json({message:'No token provided'});
        //Si existe decodifica el token y reconoce el _id del usuario
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        //verifica que el id del usuario pertenezca a la BD
        const user = User.findById(req.userId, {password:0});
        //si no existe usuario, envia error
        if(!user) return res.status(404).json({message:"no user found"});

        next();
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'});
    }
}

module.exports = verifyToken;