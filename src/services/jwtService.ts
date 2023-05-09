import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

let secret: string = ''

if (typeof process.env.JWT_TOKEN === 'string')
  {
    secret = process.env.JWT_TOKEN
}

const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secret, { expiresIn: expiration })
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secret, callbackfn)
  }
}

export default jwtService