import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

Protected.propTypes = {
    children: PropTypes.node.isRequired,
    authentication: PropTypes.bool
}

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(authentication !== authentication) {
            navigate("/login")
        } else if(!authentication !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [navigate, authentication])
    
    return loader ? <div>Loading...</div> : <>{children}</>
}