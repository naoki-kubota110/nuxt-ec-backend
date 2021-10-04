const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// const orderController = require("../controllers/orderController")

// ユーザーの一覧を取得
router.get('/all', userController.getAllUser)
// ユーザーを新規登録
router.post('/register', userController.userRegister)
// 登録済みユーザーのログイン
router.post('/login', userController.userLogin)
// token認証
router.get('/auth', userController.userAuth)

// お気に入り登録
router.post('/add-favorite', userController.userAddFavorite)
// お気に入り削除
router.post('/delete-favorite', userController.userDeleteFavorite)
// お気に入りデータ取得
router.post('/get-favorite', userController.userGetFavorite)

module.exports = router