import { Link } from "react-router-dom"

function Logo() {
    return (
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-4xl font-sourgumyy font-bold text-charcoal">
                SILK<span className="text-gold">HUE</span>
            </h1>
        </Link>
    )
}
export default Logo