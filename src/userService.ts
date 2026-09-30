import { ref } from 'vue'

export const users = ref<string[]>([])
export const currentUserName = ref<string>("No One")
export const registerName = ref('')
export const registerPassword = ref('')
export const loginName = ref('')
export const loginPassword = ref('')
export const loading = ref(false)

//------------------------------------------------
//========================================GET users 
export async function getUsersnames() {
  try {
    const response = await fetch("/api/v1/users");
    if (!response.ok) { throw new Error(response.status.toString()) }
    users.value = await response.json();
  }
  catch (err) {
    console.error("failed to get users: ", err)
  }
}


//----------------------------------------------------------------------------
//============================================================== REGISTER user
export async function registerUser(name: string, password: string) {
  try {
    const response = await fetch("/api/v1/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, name }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.error)
    }
  } catch (err) {
    console.error("Failed to create user: ", err)
  }
}


//-----------------------------------------------------------------
//======================================================LOGIN user

export async function loginUser(name: string, password: string) {
  try {
    const response = await fetch("/api/v1/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, name }),
    });
    if (response.status == 401) {
      console.log("credentials not correct")
    } else if (response.status == 200) {
      currentUserName.value = name;
    }
    
  } catch (err) {
    console.error("Failed to login: ", err)
  }
}



export async function submitRegister() {
  if (registerPassword.value.length >= 8){
    const tmpName = registerName.value
    const tmpPassword = registerPassword.value
    loading.value = true
    await registerUser(tmpName, tmpPassword)
    loading.value = false
    registerName.value = ''
    registerPassword.value = ''
  }else{
    registerPassword.value = ''
    window.alert("password too short")
  }
}

export async function submitLogin() {
  
  const name = loginName.value
  const password = loginPassword.value
  loading.value = true
  await loginUser(name, password)
  loading.value = false
  registerName.value = ''
  registerPassword.value = ''
}