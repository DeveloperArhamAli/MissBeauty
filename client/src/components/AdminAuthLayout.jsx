import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({
    children,
}) {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        if (!userData) {
            navigate("/login")
        } else if (userData) {
            const isAdmin = userData.isAdmin;
            if(!isAdmin) {
                navigate("/")
            }
        }
    }, [userData, navigate])

    return <>{children}</>
}