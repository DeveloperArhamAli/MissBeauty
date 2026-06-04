import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import useAuthStore from "./store/useAuthStore"
import AnnouncementBar from "./components/layout/AnnouncementBar"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

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
      <div>
        <AnnouncementBar />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
}
export default App