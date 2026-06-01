import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import { useEffect } from "react"
import axios from "axios"
import useAuthStore from "./store/useAuthStore"

function App() {
  const { login, logout } = useAuthStore()

  useEffect(() => {
    axios.get('/api/users/isLoggedIn')
      .then((response) => {
        if (response.data.loggedIn) {
          login({
            _id: response.data.userData._id,
            name: response.data.userData.name,
            email: response.data.userData.email,
          })
        } else {
          logout()
        }
      })
  }, [])
  
    return (
      <div className="bg-zinc-200">
        <Header />
        <Outlet />
      </div>
    )
}
export default App