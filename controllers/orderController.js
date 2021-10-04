require('express')
// const ObjectId = require('mongodb').ObjectId
const User = require('../models/user')

module.exports = {
  getAllOrders: async (req, res) => {
    const orders = await User.findOne({ _id: req.body.id })
    res.send(orders)
  },
  newCart: async (req, res) => {
    console.log("new cart")
    const payload = {
      orderId: req.body.orderId,
      status: req.body.status,
      addCartDate: req.body.addCartDate,
      itemInfo: req.body.itemInfo,
    }
    const newItem = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { orders: payload } }
    )
    res.status(200).json(newItem.orders)
  },
  addCart: async (req, res) => {
    console.log("add cart")
    console.log(req.body.payload.orderId)
    const updateData = {
      itemId: req.body.payload.itemId,
      itemName: req.body.payload.itemName,
      itemPrice: req.body.payload.itemPrice,
      itemImage: req.body.payload.itemImage,
      buyNum: req.body.payload.buyNum,
    }
    const addItem = await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId },
      { $push: { 'orders.$.itemInfo': updateData } }
    )
    res.send(addItem)
  },

  sendOrder: async (req, res) => {
    console.log('sendOrder発火')
    console.log(req.body.payload)
    const updateData = {
      destinationName: req.body.payload.destinationName,
      destinationEmail: req.body.payload.destinationEmail,
      destinationZipcode: req.body.payload.destinationZipcode,
      destinationAddress: req.body.payload.destinationAddress,
      destinationTel: req.body.payload.destinationTel,
      destinationDate: req.body.payload.destinationDate,
      // paymentMethod: req.body.payload.paymentMethod,
      creditCardNumber: req.body.payload.creditCardNumber,
      orderDate: req.body.payload.orderDate,
    }
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId},
      { $set: { 'orders.$.orderInfo': updateData}},
      {upsert:true}
    )
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.payload.orderId},
      { $set: { 'orders.$.status': req.body.payload.status} }
    )

    const userInfoData = {
      name: req.body.payload.destinationName,
      email: req.body.payload.destinationEmail,
      zipcode: req.body.payload.destinationZipcode,
      address: req.body.payload.destinationAddress,
      tel: req.body.payload.destinationTel,
    }
    await User.findOneAndUpdate(
      { _id: req.body.payload.userId },
      {$set:{userInfo:userInfoData}},
      {upsert:true}
    )
  },
  deleteCart: async (req, res) => {
    console.log('deletecart呼び出し')
    console.log(req.body)
    const xxx = await User.findOneAndUpdate(
      { 'orders.orderId': req.body.orderId },
      { $pull: { 'orders.$.itemInfo': { itemId: req.body.itemId } } }
    )
    res.send(xxx)
  },
  cancelOrder: async (req,res) => {
    console.log("キャンセルオーダーコントローラー")
    console.log(req.body)
    await User.findOneAndUpdate(
      { 'orders.orderId': req.body.orderId },
      { $set: { 'orders.$.status': 9} }
    )
  }
}