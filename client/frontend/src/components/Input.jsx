import { forwardRef, useId } from "react"

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
                {...props} />
        </div>
    )
})

export default Input