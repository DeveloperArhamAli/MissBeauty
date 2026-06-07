import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  const handleResetPassword = async (data) => {
    setError(null);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // API call would be:
      // await authService.resetPassword(token, data.password);
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">
              SILK<span className="text-gold">HUE</span>
            </h1>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-keyhole-line text-2xl text-gold"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-3">
                  Reset Password
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  Enter your new password below.
                </p>
              </div>

              {/* Error Message */}
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

              <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-lock-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border-2 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 ${
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
                          message: "Must contain uppercase, lowercase, and number"
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line text-lg`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <i className="ri-error-warning-fill text-sm"></i>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="ri-lock-line text-gray-400 text-lg"></i>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200'
                      }`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <i className="ri-error-warning-fill text-sm"></i>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-xs font-medium text-charcoal">Password Requirements:</p>
                  <ul className="space-y-1">
                    {[
                      { label: 'At least 8 characters', test: (p) => p?.length >= 8 },
                      { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
                      { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
                      { label: 'One number', test: (p) => /\d/.test(p) },
                    ].map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs">
                        <i className={`${
                          password && req.test(password) 
                            ? 'ri-check-line text-green-500' 
                            : 'ri-close-line text-gray-400'
                        }`}></i>
                        <span className={password && req.test(password) ? 'text-green-600' : 'text-gray-500'}>
                          {req.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-refresh-line text-lg"></i>
                      <span>Reset Password</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <i className="ri-check-double-line text-4xl text-green-500"></i>
              </motion.div>
              
              <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                Password Reset Successful!
              </h3>
              <p className="text-gray-500 mb-6">
                Your password has been successfully reset. You&apos;ll be redirected to the login page shortly.
              </p>

              <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-gold rounded-full"
                ></motion.div>
              </div>

              <Link
                to="/login"
                className="inline-flex bg-charcoal text-white px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold transition-colors"
              >
                Sign In Now
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;