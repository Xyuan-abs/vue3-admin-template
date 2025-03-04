import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserInfoKey = 'user-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  const data = Cookies.get(UserInfoKey)

  return data ? JSON.parse(data) : {}
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfoKey, JSON.stringify(userInfo))
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey)
}
