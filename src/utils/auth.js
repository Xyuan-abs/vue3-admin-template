import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//用户名称
const userName = 'userName'
export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(token) {
  return Cookies.set(userName, token)
}

export function removeUserName() {
  return Cookies.remove(userName)
}

//账号密码
const account = 'account'
const password = 'password'
export function getAccountPwd() {
  return {
    account: Cookies.get(account),
    password: Cookies.get(password),
  }
}

export function setAccountPwd(accountValue, passwordValue, date) {
  Cookies.set(account, accountValue, {
    expires: date,
  })
  Cookies.set(password, passwordValue, {
    expires: date,
  })
}

export function removeAccountPwd() {
  Cookies.remove(account)
  Cookies.remove(password)
}
