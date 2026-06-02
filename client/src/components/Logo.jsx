import { Link } from "react-router-dom"

function Logo() {
    return (
        <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    E-COM STORE
                </span>
            </Link>
        </div>
    )
}
export default Logo