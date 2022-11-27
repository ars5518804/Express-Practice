const router = require('express').Router()

const board = require('../controllers/boardController')
const middleware = require('../middleware/jwt-verify')

//게시글 생성
router.post('/create', middleware.jwtVerify, board.create)
//게시글 리스트
router.get('/list', board.list)
//게시글 상세정보
router.get('/info/:boardId', board.info)
//게시글 수정
router.patch('/update', middleware.jwtVerify, board.update)
//게시글 삭제
router.delete('/delete', middleware.jwtVerify, board.boardDelete)

module.exports = router