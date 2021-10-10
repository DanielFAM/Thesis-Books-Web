const authCtrl = {};
const User = require('../models/users');
const jwt = require('jsonwebtoken');

authCtrl.signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });

    const savedUser = await newUser.save();
    //Creación del token de autenticación que vence en 1 dia
    //Pide el id del objeto mas una cadena secreta
    //finalmente pide el tiempo en segundos en el que expirara
    const token = jwt.sign({id: savedUser._id}, process.env.SECRET,{
        expiresIn: 86400 //24 horas
    });  
    res.status(200).json({token})
};

authCtrl.me = async (req,res) => {
    const user = await User.findById(req.userId, { password: 0 });
    if(!user){
        //Si el usuario no existe manda error
        return res.status(404).send('No user found');
    }
    //si existe envia los datos del usuario que esten en la BD
    res.json(user);
};

authCtrl.signIn = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({email: email});

    if(!userFound) res.status(400).json({message: 'user not found'});

    const validPassword = await userFound.validatePassword(password);

    if(!validPassword) return res.status(401).json({token: null, message: 'Invalid password'});
    
    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
        expiresIn: 60 * 60 * 24
    });
    
    res.json({token});
};

authCtrl.verifyToken = async (req, res) => {
    try {
        //verifica que exista una cabecera de la petición que tenga el token
        const token = req.headers ['x-access-token'];
        //si no existe envia mensaje de error
        if(!token) return res.status(403).json({message:'No token provided'});
        //Si existe decodifica el token y reconoce el _id del usuario
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        //verifica que el id del usuario pertenezca a la BD
        const user = User.findById(decoded.id);
        //si no existe usuario, envia error
        if(!user) return res.status(404).json({message:"no user found"});
        res.json({message:'Token is valid'});
    
    } catch (error) {
        return res.status(401).json({message: 'unauthorized'});
    }
};

module.exports = authCtrl;