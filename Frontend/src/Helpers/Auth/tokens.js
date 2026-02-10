const TOKEN_KEY = 'token'

export function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(data){
   localStorage.setItem(TOKEN_KEY, data)
}