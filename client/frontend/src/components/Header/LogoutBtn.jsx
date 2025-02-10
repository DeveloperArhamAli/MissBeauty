import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        axios.get('/api/users/logout')
            .then((response) => {
                if (response.data.loggedOut) {
                    dispatch(logout())
                    navigate("/")
                }
                else if (response.data.loggedOut === false) {
                    console.log(response.data.errorMessage)
                }
            })
    }

    return (
        <button className="rounded-md p-2 bg-red-500 text-white cursor-pointer" onClick={logoutHandler}>Logout</button>
    )
}
export default LogoutBtn