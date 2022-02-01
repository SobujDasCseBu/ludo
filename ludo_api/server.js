import  express from  'express'
import  path  from  'path'
import  dotenv from  'dotenv'
import  { registerUser, authUser } from  './controllers/userControllers.js'

dotenv.config()

const app = express()
const router = express.Router()

app.use(express.json())

// router.route('/api/users').post(registerUser)
// router.route('/api/users/login').post(authUser)
app.post('/api/users', registerUser)


// for heroku publish
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API IS RUNNING in port 3000')
  })
}

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
