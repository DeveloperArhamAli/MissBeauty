import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"

function LinkButton({
    to,
    className = "",
    label,
}) {
    return (
        <NavLink 
            className={({isActive}) => `rounded-md p-2 ${className} ${isActive ? 'bg-[#ea667e] text-white' : ''}`}
            to={to}
        >
                {label}
        </NavLink>
    )
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
}

export default LinkButton