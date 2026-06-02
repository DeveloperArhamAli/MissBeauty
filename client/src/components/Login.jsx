import { Link } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import useAuthStore from "../store/useAuthStore"

function Login() {
    const { login } = useAuthStore()
    
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    
    const loginUser = async (data) => {
        setError(null)
        try {
            axios.post('/api/users/login', data)
                .then((response) => {
                    if (response.data.token) {
                        const userData = response.data.user
                        login(userData)
                        navigate("/")
                    } else {
                        setError(response.data.errorMessage)
                    }
                })
                .catch((error) => {
                    setError(error.message)
                })
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="w-2/4 min-h-[600px] flex items-center justify-center p-16">
                <div className="w-full h-full flex flex-col gap-3 border-2 border-gray-500 rounded-2xl p-10">
                    <h1 className="text-3xl text-center mt-2">Login to your account.</h1>
                    <p className="text-center mb-5">Don&apos;t have an account? <Link className="font-bold underline" to="/signup">Sign Up</Link></p>
                    {error ? <p className="text-red-500 text-center">{error}</p> : null}
                    <form onSubmit={handleSubmit(loginUser)} className="flex flex-col gap-3">
                        <Input placeholder="example@123.com" label="Email" type="email" required={true} {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                    ? true
                                    : "Email address must be a valid address",
                            }                                
                        })} />
                        <Input placeholder="********" label="Password" type="password" required={true} {...register("password", {
                            required: true,
                        })}/>
                        <Button label="Login" className="text-center text-lg" type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login