const { String } = require('core-js')
const mongoose = require('mongoose')
const orderSubSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  itemPrice: Number,
  itemImage: String,
  buyNum: Number,
})
const orderInfoSchema = new mongoose.Schema({
  destinationName: {
    type: String,
    default: '',
  },
  destinationEmail: {
    type: String,
    default: '',
  },
  destinationZipcode: {
    type: String,
    default: '',
  },
  destinationAddress: {
    type: String,
    default: '',
  },
  destinationTel: {
    type: String,
    default: '',
  },
  destinationDate: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    default: 0,
  },
  creditCardNumber: {
    type: String,
    default: '',
  },
  // 注文ボタンを押したときの日時
  orderDate: {
    type: String,
    default: '',
  },
})
const orderSchema = new mongoose.Schema({
  id: String,
  orderId: String,
  status: Number,
  addCartDate: String,
  itemInfo: [orderSubSchema],
  // 注文入力フォームのデータ
  orderInfo: {
    type: orderInfoSchema,
    default: {},
  },
})
const userInfoSchema = new mongoose.Schema({
  name: String,
  email: String,
  zipcode: String,
  address: String,
  tel: String,
})
const userFavoriteSchema = new mongoose.Schema({
  favoriteId: String,
  itemName: String,
  itemImage: String,
  itemPrice: Number,
})
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userFavorite: {
    type: [userFavoriteSchema],
    default: [],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
  userInfo: {
    type: userInfoSchema,
    default: {},
  },
})

module.exports = mongoose.model('User', UserSchema)