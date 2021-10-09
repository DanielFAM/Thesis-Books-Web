const { Router } = require('express');
const router = Router();

const usersCtrl = require('../controllers/users.controller');

const verifySignup = require('../middlewares/verifySignup');

//retornar todos los usuarios registrados en BD
router.get('/', usersCtrl.getUsers);
//retirnar usuario especifico basado en su ID
router.get('/:id', usersCtrl.getUserById);
//Crear un nuevo usuario
router.post('/create', verifySignup.checkDuplicatedUsernameOrEmail, usersCtrl.createUser);
//Borrar algun usuario en base a su ID
router.delete('/delete/:id', usersCtrl.deleteUser);



module.exports = router;