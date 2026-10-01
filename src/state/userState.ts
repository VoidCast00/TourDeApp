//this is the vue state + logic for users (register, login Components acces this 
import { ref } from 'vue'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { loginUser, registerUser } from '@/api/userApi'

const users = ref<string[]>([])
const currentUserName = ref<string>('')
const message = ref('') // little feedback line shown under the forms
const registerName = ref('')
const registerPassword = ref('')
const loginName = ref('')
const loginPassword = ref('')
const loading = ref(false)



async function submitRegister() {
  if (registerPassword.value.length >= PASSWORD_MIN_LENGTH) {
    const tmpName = registerName.value
    const tmpPassword = registerPassword.value
    loading.value = true
    try {
      await registerUser(tmpName, tmpPassword)
      message.value = "account created, you can login now"
    } catch (err) {
      console.error("failed to create user: ", err)
      message.value = "could not create account"
    }
    loading.value = false
    registerName.value = ''
    registerPassword.value = ''
  } else {
    message.value = `password too short (min ${PASSWORD_MIN_LENGTH} characters)`
  }
}

async function submitLogin() {
  const name = loginName.value
  const password = loginPassword.value
  loading.value = true
  try {
    if (await loginUser(name, password)) {
      currentUserName.value = name
      message.value = ''
    } else {
      message.value = "wrong name or password"
    }
  } catch (err) {
    console.error("failed to login: ", err)
    message.value = "login failed"
  }
  loading.value = false
  loginPassword.value = ''
}

//esier exports of functions and variables
export function useUserState() {
  return {
    users, currentUserName, loading, message,
    registerName, registerPassword, loginName, loginPassword,
    submitRegister, submitLogin,
  }
}
