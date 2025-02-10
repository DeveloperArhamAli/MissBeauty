import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login as authLogin, logout } from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(() => {
    axios.get('/api/users/isLoggedIn')
      .then((response) => {
        if (response.data.loggedIn) {
          dispatch(authLogin(response.data.userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  
    return !loading ? (
      <div className="bg-zinc-200">
        <Header />
        <Outlet />
      </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen w-full bg-[#ea667e] text-white">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    )
}
export default App