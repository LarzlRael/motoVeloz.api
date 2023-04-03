import { validationResult } from "express-validator"

export const verifyErrors = (req) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
}