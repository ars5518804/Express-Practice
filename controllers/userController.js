const { User, Login } = require('../models')
const crypto = require('crypto')

//회원가입 하는 비즈니스 로직
const register = async (req, res) => {
    try {
        const { username, password, name, phone } = req.body
        const hashPassword = crypto.createHash("sha512").update(password).digest('hex')
        let resultCode = 0

        const user = await User.findOne({ where: { username: username } })
        //아이디가 존재하는지를 판별후 존재하지 않는다면 밑에 create실행해주시고 아니면 resultCode 1001번으로 보내주시면 되요
        if (user) {
            resultCode = 1001
        } else {
            const user = await User.create({
                username: username,
                password: hashPassword,
                name: name,
                phone: phone
            })
            await Login.create({
                os: req.useragent.os,
                device: req.useragent.isMobile ? 'Mobile' : 'Desktop',
                userId: user.id
            })
            resultCode = 1
        }
        res.status(200).json({ "resultCode": resultCode, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null }) //1~10 정의 한다 1번은 회원가입 성공, 2번은 ~입력값 오류
    }
}


const info = async (req, res) => {
    try {
        const jwtUsername = req.user.username
        const { username } = req.body
        let data = null
        if (jwtUsername == username) {
            //유저의 정보를 담아서 =>
            const user = await User.findOne({ where: { username: username } })
            data = {
                username: user.username,
                name: user.name,
                phone: user.phone
            }
            resultCode = 1
            //data로 내보내는거 까지
        } else {
            resultCode = 1004 //토큰의 정보와 유저의 요청 정보가 상이함
        }

        res.status(200).json({ "resultCode": resultCode, "data": data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

const update = async (req, res) => {
    try {
        const username = req.user.username
        const user = await User.findOne({ where: { username: username } })
        const { name, phone, password } = req.body
        await User.update({
            //예외처리
            name: name == "" ? user.name : name,
            phone: phone == "" ? user.phone : phone,
            password: password == "" ? user.password : crypto.createHash("sha512").update(password).digest('hex')
        }, {
            where: { username: username }
        })
        res.status(200).json({ "resultCode": 1, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

const deleteUser = async (req, res) => {
    try {
        const username = req.user.username
        console.log(username)
        await User.destroy({ where: { username: username } })
        res.status(200).json({ "resultCode": 1, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

module.exports = { register, info, update, deleteUser }