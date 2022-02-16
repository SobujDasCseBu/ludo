import axios from "./axios"
const validateUser = async () => {
  const userInfo = JSON.parse(localStorage.getItem('token'))
  if (!userInfo || !userInfo.token) {
    return false
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userInfo?.token}`,
    },
  }
  const authRes = await axios.get('auth/token', config)
  if (authRes.data) {
    if (authRes.data.code !== 200) {
      localStorage.removeItem('token') 
      return false
    }
  }
  return true
}
export { validateUser }