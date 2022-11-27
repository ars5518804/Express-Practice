const router = require('express').Router()

const user = require('../controllers/userController')
const middleware = require('../middleware/jwt-verify')

router.post('/register', user.register)
//회원정보 불러옴
router.post('/info', middleware.jwtVerify, user.info)
//회원정보 수정
router.patch('/update', middleware.jwtVerify, user.update)
//회원 탈퇴
router.delete('/delete', middleware.jwtVerify, user.deleteUser)

module.exports = router