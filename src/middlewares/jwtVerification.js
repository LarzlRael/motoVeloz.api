import jwt from 'jsonwebtoken'
const verificateToken = (req, res, next) => {
  //? con esta variable vamos a buscar la cabezera que tiene nuestro token
  let token = req.get('token')
  //? esta funcion recibe 3 parametros
  //? 1- token
  //? 2- seed
  //? 3- callback
  jwt.verify(token, process.env.JWTSEED, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Token no valido',
        },
      })
    }
    //? en esta parte se crea un req los datos del usuario
    req.user = decoded.usuario

    next()
  })
}

module.exports = { verificateToken, verificaRolAdmin }
