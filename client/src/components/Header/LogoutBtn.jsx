import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../store/useAuthStore"

function LogoutBtn() {
    const { logout } = useAuthStore()
    const navigate = useNavigate()

    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then((response) => {
                if (response.data.loggedOut) {
                    logout()
                    navigate("/")
                }
                else {
                    console.log(response.data.errorMessage)
                }
            })
    }

    return (
        <button className="rounded-md p-2 bg-red-500 text-white cursor-pointer" onClick={logoutHandler}>
            Logout
        </button>
    )
}
export default LogoutBtn