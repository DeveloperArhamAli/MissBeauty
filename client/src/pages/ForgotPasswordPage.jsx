import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleForgotPassword = async (data) => {
    setError(null);
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // API call would be:
      // await authService.forgotPassword(data.email);
      
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lock-unlock-line text-2xl text-gold"></i>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-3">
                  Forgot Password?
                </h2>
                <p className="text-gray-500 text-sm md:text-base">
                  No worries! Enter your email address and we&apos;ll send you a link to reset your password.
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

              {/* Forgot Password Form */}
              <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-5">
                {/* Email Field */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line text-lg"></i>
                      <span>Send Reset Link</span>
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
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <i className="ri-check-line text-4xl text-green-500"></i>
              </motion.div>
              
              <h3 className="text-xl font-serif font-bold text-charcoal mb-3">
                Check Your Email
              </h3>
              <p className="text-gray-500 mb-6">
                We&apos;ve sent a password reset link to your email address. 
                Please check your inbox and follow the instructions.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-information-line text-gold text-xl flex-shrink-0 mt-0.5"></i>
                  <div className="text-left">
                    <p className="text-sm font-medium text-charcoal mb-1">Didn&apos;t receive the email?</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Check your spam or junk folder</li>
                      <li>• Make sure you entered the correct email address</li>
                      <li>• The link expires in 30 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setEmailSent(false)}
                  className="w-full border-2 border-charcoal text-charcoal py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-charcoal hover:text-white transition-colors"
                >
                  Try Another Email
                </button>
                <button
                  onClick={() => handleForgotPassword({ email: '' })}
                  className="w-full text-gold hover:text-gold-dark text-sm font-medium transition-colors"
                >
                  Resend Email
                </button>
              </div>
            </motion.div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors font-medium"
            >
              <i className="ri-arrow-left-line"></i>
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link to="/contact" className="text-gold hover:text-gold-dark font-medium transition-colors">
              Contact Support
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-4 space-y-2">
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style>{`
        input[type="email"]::placeholder {
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;