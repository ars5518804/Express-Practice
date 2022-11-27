const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

exports.jwtVerify = (req, res, next) => {
    try {
        //headers
        const accessToken = req.headers.token
        //토큰 검증
        jwt.verify(accessToken, JWT_SECRET_KEY, (err, data) => {
            if (err) {
                //인증 에러 => 정상적인 우리 서버에서 발행해준 토큰이 아니거나, 토큰이 이미 만료되었을때
                res.status(403).json({ "resultCode": -30, "data": null })
            } else {
                req.user = data//{ username: user.username }
                next() //미들웨어가 가로챈 요청을 다시 원래의 API 로 보내줌
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}