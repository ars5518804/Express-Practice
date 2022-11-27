const { User, Login } = require('../models')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const login = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body)
        let resultCode = 0
        const hashPassword = crypto.createHash('sha512').update(password).digest('hex')
        const user = await User.findOne({ where: { username: username } })
        let data = null
        if (user) {
            if (user.password == hashPassword) {
                let accessToken = jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '1d' })
                let refreshToken = jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '7d' })
                let username = user.username
                data = {
                    accessToken,
                    refreshToken,
                    username
                }
                await Login.update({
                    os: req.useragent.os,
                    device: req.useragent.isMobile ? 'Mobile' : 'Desktop'
                },
                    {
                        where: { userId: user.id }
                    })
                resultCode = 1
            } else {
                resultCode = 1003
            }
        } else {
            resultCode = 1002
        }
        res.status(200).json({ "resultCode": resultCode, "data": data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}


module.exports = { login }