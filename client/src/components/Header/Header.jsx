import { useSelector } from "react-redux"
import LinkButton from "../LinkButton"
import Logo from "../Logo"
import LogoutBtn from "./LogoutBtn"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const navLinks = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Products",
            slug: "/products",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Cart",
            slug: "/cart",
            active: authStatus && !userData.isAdmin
        },
        {
            name: "Admin",
            slug: "/admin/dashboard",
            active: authStatus && userData.isAdmin
        },
        {
            name: "Manage",
            slug: "/admin/manage",
            active: authStatus && userData.isAdmin
        }
    ]
    
    return (
        <div className="flex items-center justify-between p-4">
            <div>
                <Logo />
            </div>
            <div className="flex items-center gap-7">
                {navLinks.map((navLink) => navLink.active ? (
                    <div key={navLink.slug}>
                        <LinkButton label={navLink.name} to={navLink.slug} />
                    </div>
                ) : null)}
                {authStatus ? (
                    <div>
                        <LogoutBtn />
                    </div>
                ) : null}
            </div>
        </div>
    )
}
export default Header