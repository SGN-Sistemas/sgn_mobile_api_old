import { passwordStrength } from 'check-password-strength'

const validPassword = (password: string) => {
  if (password.length < 10) {
    return {
      message: 'Senha deve conter mais de 10 caracteres',
      error: true,
      status: 400
    }
  }

  if (passwordStrength(password).value === 'Strong') {
    return {
      message: '',
      error: false,
      status: 200
    }
  } else {
    return {
      message: 'Senha deve ser forte',
      error: true,
      status: 400
    }
  }
}

export default validPassword
