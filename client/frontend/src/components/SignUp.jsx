import { Link } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"

function SignUp() {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    
    const signUp = async (data) => {
        try {
            setError(null)
            setSuccess(null)
            axios.post('/api/users/register', data)
                .then((response) => {
                    if (response.data.token) {
                        const userData = response.data.user
                        dispatch(authLogin(userData))
                        navigate("/")
                    }
                    if (response.data.errorMessage) {
                        setError(response.data.errorMessage)
                    }
                    if (response.data.successMessage) {
                        setSuccess(response.data.successMessage)
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
                        <h1 className="text-3xl text-center mt-2">Sign Up to create account.</h1>
                        <p className="text-center mb-5">Already have an account? <Link className="font-bold underline" to="/login">Login</Link></p>
                        {error ? <p className="text-red-500 text-center">{error}</p> : null}
                        {success ? <p className="text-green-500 text-center">{success}</p> : null}
                        <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-3">
                            <Input placeholder="exapmle" label="Full Name" type="text" {...register("fullname", {
                                required: true,
                            })}/>
                            <Input placeholder="example@123.com" label="Email" type="email" {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                        ? true
                                        : "Email address must be a valid address",
                                }                                
                            })} />
                            <Input placeholder="123456789" label="Password" type="password" {...register("password", {
                                required: true,
                            })}/>
                            <Button label="Sign Up" className="text-center text-lg" type="submit"/>
                        </form>
                    </div>
            </div>
        </div>
    )
}
export default SignUp