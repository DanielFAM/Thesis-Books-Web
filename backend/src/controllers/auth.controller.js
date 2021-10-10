const authCtrl = {};
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { response } = require('express');

const client = OAuth2Client("825534615979-g87f8lf5ssvnch65gqj8fdjk1rbqe8ei.apps.googleusercontent.com");

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
    res.status(200).json({token});
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


authCtrl.googleLogin = (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({idToken: tokenId, audience: '825534615979-g87f8lf5ssvnch65gqj8fdjk1rbqe8ei.apps.googleusercontent.com'})
        .then(response => {
            const {email_verified, name, email} = response.payload;
            if(email_verified) {
                User.findOne({email}).exec((err, user) => {
                    if (err) {
                        return res.status(404).json({
                            error: "something went wrong..."
                        });
                    }else{
                        if (user) {
                            const token = jwt.sign({id: user._id}, process.env.SECRET,{
                                expiresIn: 86400 //24 horas
                            });
                            const {_id, username, email}  = user;
                            res.status(200).json({
                                token,
                                user: {_id,username, email}
                            });
                        }else{
                            let password = User.encryptPassword(email+process.env.SECRET);
                            let newUser = new User({username: name, email, password});
                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(404).json({
                                        error: "something went wrong..."
                                    });
                                }
                                const token = jwt.sign({id: data._id}, process.env.SECRET,{
                                    expiresIn: 86400 //24 horas
                                });
                                const {_id, username, email}  = newUser;
                                res.status(200).json({
                                    token,
                                    user: {_id,username, email}
                                });
                            });
                        }
                    }
                });
            }
        });

    console.log();
};

module.exports = authCtrl;