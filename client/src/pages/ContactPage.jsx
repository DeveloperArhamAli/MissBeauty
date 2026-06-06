import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit contact form
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: 'ri-phone-line',
      title: 'Phone',
      details: ['+92 42 1234 5678', '+92 300 1234567'],
      action: 'tel:+924212345678',
      actionText: 'Call Now'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email',
      details: ['info@silkhue.com', 'support@silkhue.com'],
      action: 'mailto:info@silkhue.com',
      actionText: 'Send Email'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Address',
      details: ['123 Beauty Street, Gulberg III', 'Lahore, Punjab 54000'],
      action: 'https://maps.google.com',
      actionText: 'View on Map'
    },
    {
      icon: 'ri-time-line',
      title: 'Working Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
      action: null,
      actionText: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container-custom py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">Contact Us</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">Get in Touch</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Have a question or need assistance? We&apos;re here to help you with anything you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className={`${info.icon} text-xl text-gold`}></i>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-charcoal mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-sm text-gray-600">{detail}</p>
                    ))}
                    {info.action && (
                      <a
                        href={info.action}
                        className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark font-medium mt-2 transition-colors"
                      >
                        {info.actionText} <i className="ri-arrow-right-line"></i>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Send us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line text-3xl text-green-500"></i>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Message Sent!</h3>
                  <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Order Number (if applicable)</label>
                      <input
                        type="text"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors font-mono"
                        placeholder="SH-2024-001234"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Subject *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Issue</option>
                      <option value="product">Product Question</option>
                      <option value="return">Return/Exchange</option>
                      <option value="account">Account Help</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Describe your issue or question..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold text-white py-4 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="ri-send-plane-line"></i>
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;