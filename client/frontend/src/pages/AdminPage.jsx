import { Outlet } from "react-router-dom"

function AdminPage() { 
    return (
        <div className="bg-zinc-200"><Outlet /></div>
    )
}
export default AdminPage