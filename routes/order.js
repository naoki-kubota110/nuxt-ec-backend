const express = require('express')
const orderController = require("../controllers/orderController")
const router = express.Router()

// ユーザーのオーダー情報すべての取得
router.post('/all-orders', orderController.getAllOrders)
// カートが空の状態から新たに商品を追加
router.post('/new-cart', orderController .newCart)
// カートに商品が１つ以上あり、商品を追加
router.post('/add-cart', orderController.addCart)
// カートから商品を削除
router.post('/delete-cart', orderController.deleteCart)
// カート内の商品の注文を実行
router.post('/send-order', orderController.sendOrder)
// 注文が完了した商品のキャンセル
router.post("/cancel-order", orderController.cancelOrder)

module.exports = router