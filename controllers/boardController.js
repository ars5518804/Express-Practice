const { User, Login, Board } = require('../models')



const create = async (req, res) => {
    try {
        const { title, content } = req.body
        const username = req.user.username
        const user = await User.findOne({ where: { username: username } })
        const login = await Login.findOne({ where: { userId: user.id } }) //로그인 테이블에 존재하는 정보
        let resultCode = 0
        if (login.os == req.useragent.os && login.device == (req.useragent.isMobile ? 'Mobile' : 'Desktop')) {
            //게시글 생성
            await Board.create({
                title: title,
                content: content,
                writer: user.name,
                userId: user.id
            })
            resultCode = 1
        } else { // 다른 기기 로그인했으니 기존 로그인 해지
            resultCode = 2001
        }
        res.status(200).json({ "resultCode": resultCode, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

const list = async (_, res) => {
    try {
        const board = await Board.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        let data = []
        board.forEach(o => {
            data.push({
                title: o.title,
                writer: o.writer,
                createdAt: o.createdAt
            })
        })
        res.status(200).json({ "resultCode": 1, "data": data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

const info = async (req, res) => {
    try {
        const boardId = req.params.boardId
        let data = null
        const board = await Board.findOne({ where: { id: boardId } })
        data = {
            title: board.title,
            writer: board.writer,
            content: board.content,
            crreatedAt: board.createdAt
        }
        //boardId로 해당 게시물 1개만 찾아서
        //data 변수에 제목, 작성자, 내용, 작성 일시를 모두 담아 내보냄
        res.status(200).json({ "resultCode": 1, "data": data })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}


const update = async (req, res) => {
    try {
        const username = req.user.username // 토큰으로 username 받음
        const { title, content, boardId } = req.body
        const user = await User.findOne({ where: { username: username } })
        const login = await Login.findOne({ where: { userId: user.id } })
        const board = await Board.findOne({ where: { id: boardId } })
        let resultCode = 0
        if (login.os == req.useragent.os && login.device == (req.useragent.isMobile ? 'Mobile' : 'Desktop')) { //중복 로그인 예외
            if (board.userId == user.id) { //게시글의 유저와 현재 로그인한 유저가 같을때
                await Board.update({
                    title: title == "" ? board.title : title,
                    content: content == "" ? board.content : content
                }, {
                    where: { id: boardId, userId: user.id }
                })
                resultCode = 1
            } else {
                resultCode = 2011 //내 게시글 아님
            }
        } else {
            resultCode = 2001 //중복 로그인
        }
        res.status(200).json({ "resultCode": resultCode, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}
const boardDelete = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.user.username } })
        const login = await Login.findOne({ where: { userId: user.id } })
        const { boardId } = req.body
        const board = await Board.findOne({ where: { id: boardId } })
        let resultCode = 0
        if (login.os == req.useragent.os && login.device == (req.useragent.isMobile ? 'Mobile' : 'Desktop')) {
            if (board.userId == user.id) {
                await Board.destroy({ where: { id: boardId, userId: user.id } })
                resultCode = 1
            } else {
                resultCode = 2011 //내 게시글 아님
            }
        } else {
            resultCode = 2001 //중복 로그인
        }
        res.status(200).json({ "resultCode": resultCode, "data": null })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "resultCode": -1, "data": null })
    }
}

module.exports = { create, list, info, update, boardDelete }