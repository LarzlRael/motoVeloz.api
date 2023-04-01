import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { userName, password } = req.body

  const getUser = await User.findOne({
    userName,
  })

  if (!getUser) {
    return res.status(400).json({
      ok: false,
      message: 'Usuario no encontrado',
    })
  }

  if (!bcrypt.compareSync(password, getUser.password)) {
    return res.status(400).json({
      ok: false,
      message: 'Contraseña incorrecta',
    })
  }

  const token = jwt.sign({ usuario: getUser.userName }, process.env.JWTSEED, {
    expiresIn: 14400,
  })
  return res.status(200).json({
    token,
    id: getUser.id_user,
  })
}

export const register = async (req, res) => {
  const { username, password, email } = req.body
  const getUser = await User.find({
    where: {
      username,
      email,
    },
  })
  if (getUser && getUser.length > 0) {
    return res.status(400).json({
      ok: false,
      message: 'El usuario ya existe',
    })
  }
  const newUser = new User({
    ...req.body,
  })
  newUser.password = bcrypt.hashSync(password, 10)
  await newUser.save()
  return res.status(200).json({
    ok: true,
  })
}
