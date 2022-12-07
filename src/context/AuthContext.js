// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import configs from 'src/configs/configs'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  loadingButton: false,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [loadingButton, setLoadingButton] = useState(defaultProvider.loadingButton)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        // console.log('Stored token : ', storedToken)
        setLoading(true)
        await axios
          .get('http://127.0.0.1:8000/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          })
          .then(async response => {
            setLoading(false)

            // console.log(response.data.data.user)

            setUser({ ...response.data.data.user })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`${configs.API_URL}/auth/login`, params)
      .then(async response => {
        params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token) : null

        const returnUrl = router.query.returnUrl
        setUser({ ...response.data.user_data })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.user_data)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, successCallback, errorCallback) => {
    setLoadingButton(true)
    axios
      .post(`${configs.API_URL}/auth/register`, params)
      .then(res => {
        setLoadingButton(false)
        successCallback ? successCallback(res) : null
      })
      .catch(err => {
        setLoadingButton(false)
        errorCallback ? errorCallback(err) : null
      })
  }

  const values = {
    user,
    loading,
    loadingButton,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
