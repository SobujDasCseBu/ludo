const express =  require('express')
const path  = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())


// for heroku publish
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API IS RUNNING')
  })
}

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
