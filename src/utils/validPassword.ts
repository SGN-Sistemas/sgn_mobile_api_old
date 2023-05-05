import { passwordStrength } from 'check-password-strength'

const validPassword = (password: string) => {
  if (passwordStrength(password).value === 'Strong') {
    return true
  } else {
    return false
  }
}

export default validPassword
