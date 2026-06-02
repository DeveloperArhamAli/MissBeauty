import axios from "axios"
import { useEffect, useState } from "react"
import DashCard from "../components/AdminComponents/DashCard"

function AdminDashboardPage() {
    const [userCount, setUserCount] = useState(null)
    const [totalRevenueLastWeek, setTotalRevenueLastWeek] = useState(null)
    const [totalOrdersinlast24hrs, setTotalOrdersinlast24hrs] = useState(null)
    const [productCount, setProductCount] = useState(null)
    const [totalRevenue, setTotalRevenue] = useState(null)
    const [totalOrders, setTotalOrders] = useState(null)
    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        axios.get("/api/owners/admin")
        .then(function (response){
            setUserCount(response.data.userCount)
            setTotalRevenueLastWeek(response.data.totalRevenueLastWeek)
            setTotalOrdersinlast24hrs(response.data.totalOrdersinlast24hrs)
            setProductCount(response.data.productCount)
            setTotalRevenue(response.data.totalRevenue)
            setTotalOrders(response.data.totalOrders)
            setOrders(response.data.orders)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }, [userCount, totalRevenueLastWeek, totalOrdersinlast24hrs, productCount, totalRevenue, totalOrders, orders])
    
    return (
        <main className="flex-1 min-h-screen">

            <div className="container px-6 py-8 mx-auto">

                <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

                <div className="mt-4">

                    <div className="flex flex-wrap -mx-6">

                        <DashCard heading={userCount} svgBg="bg-indigo-500" content="Total Users" />

                        <DashCard heading={`Rs. ${totalRevenueLastWeek}`} svgBg="bg-green-600" content="Weekly Revenue" />

                        <DashCard heading={`${totalOrdersinlast24hrs} Orders`} svgBg="bg-orange-600" content="in 24 hrs" />

                        <DashCard heading={productCount} svgBg="bg-pink-600" content="Total Products" />

                        <DashCard heading={`Rs. ${totalRevenue}`} svgBg="bg-green-600" content="Total Revenue" />

                        <DashCard heading={totalOrders} svgBg="bg-orange-600" content="Total Orders" />

                    </div>
                    
                </div>

                <div className="flex flex-col mt-8">

                    <h3 className="text-3xl font-medium text-gray-700">Recent Orders</h3>

                {orders ? (
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mt-4">

                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">

                            <table className="min-w-full">

                                <thead>

                                    <tr>

                                        <th
                                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Name</th>
                                        <th
                                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Time</th>
                                        <th
                                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Status</th>
                                        <th
                                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Price</th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">

                                    {orders.forEach(order => {

                                        if (order.order.status === "Pending") {
                                            <tr>

                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

                                                    <div className="flex items-center">
        
                                                        <div className="ml-4">

                                                            <div className="text-sm font-medium leading-5 text-gray-900">{ order.user.charAt(0).toUpperCase() + order.user.slice(1) }</div>

                                                            <div className="text-sm leading-5 text-gray-500">{ order.order.contactNumber }</div>
                                                            
                                                        </div>

                                                    </div>

                                                </td>
        
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

                                                    <div className="text-sm leading-5 text-gray-900">
                                                        { order.order.date.toLocaleTimeString() }
                                                    </div>

                                                    <div className="text-sm leading-5 text-gray-500">
                                                        { order.order.date.toLocaleDateString() }
                                                    </div>

                                                </td>
        
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">

                                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-white bg-yellow-500 rounded-full">{ order.order.status }</span>

                                                </td>
        
                                                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                                    Rs. { order.order.totalPrice }
                                                </td>
        
                                                <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">

                                                    <a href="/owners/orders/{ order.order._id }" className="text-pink-600 hover:text-pink-900">Details</a>

                                                </td>

                                            </tr>
                                        }
                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>
                ) : <div className="mt-3 text-xl flex items-center justify-center min-h-16"><h1>No Recent Orders Yet!</h1></div>}
                </div>

            </div>

        </main>
    )
}
export default AdminDashboardPage