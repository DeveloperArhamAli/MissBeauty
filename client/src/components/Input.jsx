import { forwardRef, useId } from "react"
import PropTypes from "prop-types"

const Input = forwardRef(function Input({
    type = "text",
    placeholder,
    value,
    className = "",
    disabled,
    label,
    required,
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className="w-full">
            {label && <label htmlFor={id}>{label}:</label>}
            <input 
                type={type}
                placeholder={placeholder}
                value={value}   
                className={`outline-none w-full border-2 border-black rounded-lg p-2 ${className}`}
                disabled={disabled}
                id={id}
                required={required}
                ref={ref}
                {...props}
            />
        </div>
    )
})

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    required: PropTypes.bool,
}

export default Input