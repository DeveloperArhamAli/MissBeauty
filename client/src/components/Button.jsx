import PropTypes from "prop-types"

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
}

function Button({
    label,
    onClick,
    className = "",
    type = "button",
    ...props
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-md p-2 bg-[#ea667e] text-white cursor-pointer w-full ${className}`}
            type={type}
            {...props}
        >
            {label}
        </button>
    )
}
export default Button