import { NavLink } from "react-router-dom"

function LinkButton({
    to,
    className = "",
    label,
}) {
    return (
        <NavLink 
            className={({isActive}) => `rounded-md p-2 ${className} ${isActive ? 'bg-[#ea667e] text-white' : ''}`}
            to={to}>{label}</NavLink>
    )
}
export default LinkButton