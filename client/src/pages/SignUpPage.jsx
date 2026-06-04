/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import useAuthStore from "../store/useAuthStore"

function SignUp() {
    const { login } = useAuthStore()
    
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const signUp = async (data) => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.post('/api/users/register', data)
            if (response.data.token) {
                const userData = response.data.user
                login(userData)
                navigate("/")
            } else {
                setError(response.data.errorMessage)
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred during registration")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative"
            >
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
                            Create Account
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base">
                            Join the beauty community today
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2"
                        >
                            <i className="ri-error-warning-line text-lg flex-shrink-0"></i>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit(signUp)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-user-line text-gray-400 text-lg"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 ${
                                        errors.fullname ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                                    }`}
                                    {...register("fullname", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name must be at least 2 characters"
                                        }
                                    })}
                                />
                            </div>
                            {errors.fullname && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-fill text-sm"></i>
                                    {errors.fullname.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-mail-line text-gray-400 text-lg"></i>
                                </div>
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 ${
                                        errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                                    }`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-fill text-sm"></i>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="ri-lock-line text-gray-400 text-lg"></i>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 ${
                                        errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                                    }`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: "Password must contain uppercase, lowercase, and number"
                                        }
                                    })}
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                    <i className="ri-error-warning-fill text-sm"></i>
                                    {errors.password.message}
                                </p>
                            )}
                            {/* Password Requirements */}
                            <div className="mt-2 space-y-1">
                                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                    <i className="ri-information-line"></i>
                                    Password must contain:
                                </p>
                                <ul className="text-xs text-gray-400 space-y-0.5 pl-5 list-disc">
                                    <li>At least 8 characters</li>
                                    <li>One uppercase letter</li>
                                    <li>One lowercase letter</li>
                                    <li>One number</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-gold focus:ring-gold"
                                {...register("terms", {
                                    required: "You must accept the terms and conditions"
                                })}
                            />
                            <label className="text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-gold hover:text-gold-dark transition-colors font-medium">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-gold hover:text-gold-dark transition-colors font-medium">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="text-xs text-red-500 flex items-center gap-1 -mt-3">
                                <i className="ri-error-warning-fill text-sm"></i>
                                {errors.terms.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-charcoal text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <i className="ri-user-add-line text-lg"></i>
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition-all duration-300 text-sm font-medium text-charcoal">
                            <i className="ri-google-fill text-lg"></i>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition-all duration-300 text-sm font-medium text-charcoal">
                            <i className="ri-facebook-fill text-lg"></i>
                            Facebook
                        </button>
                    </div>

                    <p className="text-center mt-8 text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-gold hover:text-gold-dark font-semibold transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="text-center mt-6 space-y-2">
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                        <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
                        <span>•</span>
                        <Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                input[type="checkbox"] {
                    accent-color: #C9A66B;
                }
            `}</style>
        </div>
    );
}

export default SignUp