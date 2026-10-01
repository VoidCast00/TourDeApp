//this is the vue state + logic for users (register, login Components acces this 
import { ref } from 'vue'
import { PASSWORD_MIN_LENGTH } from '@shared/constants'
import { loginUser, registerUser } from '@/api/userApi'

const users = ref<string[]>([])
const currentUserName = ref<string>("No One")
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
    } catch (err) {
      console.error("failed to create user: ", err)
    }
    loading.value = false
    registerName.value = ''
    registerPassword.value = ''
  } else {
    window.alert("password too short :(")
  }
}

async function submitLogin() {
  const name = loginName.value
  const password = loginPassword.value
  loading.value = true
  try {
    if (await loginUser(name, password)) {
      currentUserName.value = name
    } else {
      console.log("credentials not correct")
    }
  } catch (err) {
    console.error("failed to login: ", err)
  }
  loading.value = false
  registerName.value = ''
  registerPassword.value = ''
}

//esier exports of functions and variables
export function useUserState() {
  return {
    users, currentUserName, loading,
    registerName, registerPassword, loginName, loginPassword,
    submitRegister, submitLogin,
  }
}
