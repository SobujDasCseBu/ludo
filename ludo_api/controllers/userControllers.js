import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { conn, connectDB } from '../config/db.js'

const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  })
}

const authToken = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log('auth decoded: ', decoded)
  const connectionStatus = await connectDB()
  console.log('auth connection: ', connectionStatus)
  if (!decoded.id) {
    res.status(401).json({code: 401, message: 'Invalid Token'})
    throw new Error('Invalid Token')
  }
  let result = await new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM users WHERE id = '${decoded.id}'`, function (err, result, fields) {
      if (err) resolve({error: err})
      resolve(result)
    })
  }) 
  console.log('auth result: ', result)
  if (result.length > 0) {
    res.status(200).json({code: 200, message: 'Token Validated Successfully'})
  } else {
    res.status(401).json({code: 401, message: 'Invalid User'})
    throw new Error('Invalid User')
  }
  
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  const connectionStatus = await connectDB()

  let result = await new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM users WHERE email = '${email}' && password = '${password}'`, function (err, result, fields) {
      if (err) resolve({error: err})
      resolve(result)
    })
  }) 
  console.log('result: ', result)
  if (result.length === 0) {
    res.status(401).json({code: 401, message: 'Invalid email or password'})
    throw new Error('Invalid email or password')
  }

  console.log('result: ', result[0].id)
  const token = createJWTToken(result[0].id)
  console.log('token: ', token)

  res.status(200).json({code: 200, message: 'Logged in successfully', token})
  
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  console.log('register user body: ', req.body)
  
  const connectionStatus = await connectDB()
  
  let result = await new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result, fields) {
      if (err) resolve({error: err})
      resolve(result)
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
  
  const token = createJWTToken(id)
  console.log('token: ', token)
  if (result.error) {
    res.status(400).json({code: 400, message: 'Someting wrong'})
  } else {
    res.status(200).json({code: 200, message: 'User registered successfully', token})
  }
  
})

export {authToken, authUser, registerUser}