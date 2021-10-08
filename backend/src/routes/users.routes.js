const { Router } = require('express');
const router = Router();

const { getUsers, 
        getUserById,
        createUser,
        deleteUser
} = require('../controllers/users.controller');

const { 
        checkDuplicatedUsernameOrEmail
} = require('../middlewares/verifySignup');

//retornar todos los usuarios registrados en BD
router.get('/', getUsers);
//retirnar usuario especifico basado en su ID
router.get('/:id', getUserById);
//Crear un nuevo usuario
router.post('/create', checkDuplicatedUsernameOrEmail, createUser);
//Borrar algun usuario en base a su ID
router.delete('/delete/:id', deleteUser);



module.exports = router;