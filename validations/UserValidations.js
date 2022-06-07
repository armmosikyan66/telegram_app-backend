import validate from 'express-validator';

const UserValidations = [
    validate.body('email', 'Введите E-Mail')
        .isEmail()
        .withMessage('Неверный E-Mail')
        .isLength({
            max: 40
        })
        .withMessage('Допустимое кол-во символов в почте до 40.'),
    validate.body('username', 'Укажите логин')
        .isString()
        .isLength({
            min: 2,
            max: 40,
        })
        .withMessage('Допустимое кол-во символов в логине от 2 до 40.'),
    validate.body('password', 'Укажите пароль')
        .isString()
        .isLength({
            min: 6,
        })
        .withMessage('Минимальная длина пароля 6 символов'),
]

export default UserValidations;