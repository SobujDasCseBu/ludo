import asyncHandler from 'express-async-handler'
import { conn } from '../config/db.js'


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // const user = await User.findOne({ email })
  // if (user && (await user.matchPassword(password))) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     token: generateToken(user._id),
  //   })
  // } else {
  //   res.status(401)
  //   throw new Error('Invalid email or password')
  // }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log('register user body: ', req.body)
  
  await new Promise((resolve, reject) => {
    if (conn.state === 'disconnected') {
      conn.connect(function (err) {
        if (err) resolve({error: err})
        resolve({status: 'connected'})
      })
    }
    resolve({status: 'connected'})
  })
  
  let result = await new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result, fields) {
      if (err) resolve({error: err})
      resolve(result)
      // console.log('result: ', result)
    })
  }) 
  console.log('result: ', result)
  if (result.length > 0) {
    res.status(500).json({code: 500, message: 'User already exists'})
    throw new Error('User already exists')
  }
  const id = (new Date()).getTime()
  result = await new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO  users 
        (id, name, email, password ) VALUES 
        ('${id}', '${name}', '${email}', '${password}')`,
      function (err, result, fields) {
      if (err) resolve({error: err})
      resolve(result)
      // console.log('result: ', result)
    })
  }) 
  console.log('insert result: ', result)
  
  res.send('Success')
})

export {authUser, registerUser}