const express = require("express");
require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 8
const User = require('../models/user')

module.exports = {
  getAllUser: async (req, res) => {
    const Users = await User.find({})
    res.status(200).json(Users)
  },
  // ユーザーの新規登録
  userRegister: async (req, res) => {
    // console.log("userRegister")
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      })
      const savedUser = await newUser.save()
      res.json(savedUser)
    } catch (err) {
      console.log(err)
    }
  },
  // ユーザーのログイン処理
  userLogin: async (req, res) => {
    console.log('user login')
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        res.json({ message: 'user not found' })
      } else {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
          res.json({ message: 'password not correct' })
        } else {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
          }
          const token = jwt.sign(payload, 'secret')
          res.json({ token })
        }
      }
    } catch (err) {
      console.log('エラーハンドリング')
      console.log(err)
    }
  },
  // ユーザーの認証処理
  userAuth: async (req, res) => {
    console.log('user Auth')
    try {
      console.log('try')
      const bearToken = await req.headers['authorization']
      // console.log(bearToken)
      const bearer = await bearToken.split(' ')
      // console.log(bearer)
      const token = await bearer[1]
      // console.log(token)
      const user = await jwt.verify(token, 'secret')
      res.json({ user })
    } catch (err) {
      res.sendStatus(403)
    }
  },
  userAddFavorite: async (req, res) => {
    try {
      const favoriteItem = {
        favoriteId: req.body.itemInfo[0].itemId,
        itemName: req.body.itemInfo[0].itemName,
        itemImage: req.body.itemInfo[0].itemImage,
        itemPrice: req.body.itemInfo[0].itemPrice,
      }
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { userFavorite: favoriteItem } }
      )
      res.sendStatus(200)
    } catch (err) {
      //  エラーハンドリング
    }
  },
  userDeleteFavorite: async (req, res) => {
    const deleteData = await User.findOneAndUpdate(
      { 'userFavorite.favoriteId': req.body.favoriteId },
      { $pull: { userFavorite: { favoriteId: req.body.favoriteId } } }
    )
    res.send(deleteData)
  },
  userGetFavorite: async (req, res) => {
    const favoriteArray = await User.findOne({ _id: req.body.id })
    res.send(favoriteArray)
  },
}