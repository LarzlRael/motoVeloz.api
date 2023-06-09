import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/
dotenv.config()

import multer, { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path, { dirname } from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// importing routes
import storeRoutes from './routes/store.routes.js'
import authRoutes from './routes/auth.routes.js'
import notificationRoutes from './routes/notification.routes.js'

import dbConnection from './database/databaseConfig.js'
/* import { checkFileType } from './utils/utilsFiles.js' */

const app = express()

/* Database Conection */
dbConnection()

// Middlewares

const port = process.env.PORT || 4000
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
const storage = diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
    console.log(file)
    cb(null, uuidv4() + path.extname(file.originalname))
  },
})
app.use(
  multer({
    storage,
    fileFilter(_req, file, callback) {
      checkFileType(file, callback)
    },
    limits: { fileSize: 10000000 },
  }).single('image'),
)
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}
//public route
app.use(express.static(__dirname + '/public/dist'))

// Routes
app.use('/api/stores', storeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/notifications', notificationRoutes)

//
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/dist/', 'index.html'))
})

app.listen(port, (err) => {
  if (err) throw new Error(err)
  console.log('Servidor on PORT http://localhost:' + port)
})
