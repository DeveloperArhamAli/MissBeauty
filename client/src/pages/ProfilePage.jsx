import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+92 300 1234567',
    dateOfBirth: '1995-06-15',
    gender: 'female',
    avatar: null
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Beauty Street, Gulberg III',
      city: 'Lahore',
      state: 'Punjab',
      zip: '54000',
      phone: '+92 300 1234567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      street: '456 Business Avenue, DHA Phase 5',
      city: 'Karachi',
      state: 'Sindh',
      zip: '75500',
      phone: '+92 301 7654321',
      isDefault: false
    }
  ]);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: 'ri-user-line' },
    { id: 'addresses', label: 'Addresses', icon: 'ri-map-pin-line' },
    { id: 'password', label: 'Password', icon: 'ri-lock-line' },
    { id: 'preferences', label: 'Preferences', icon: 'ri-settings-3-line' },
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // API call to update profile
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddr = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddr]);
    setNewAddress({ type: 'Home', name: '', street: '', city: '', state: '', zip: '', phone: '' });
    setShowAddAddress(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // API call to change password
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-charcoal font-medium">My Account</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">My Account</h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
              {/* User Info */}
              <div className="p-6 text-center border-b border-gray-100">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-line text-3xl text-gold"></i>
                </div>
                <h3 className="font-serif font-bold text-charcoal">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-sm text-gray-500">{profileData.email}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all mb-1 ${
                      activeTab === tab.id
                        ? 'bg-gold text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <i className={tab.icon}></i>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Logout */}
              <div className="p-4 border-t border-gray-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <i className="ri-logout-box-line"></i>
                  Sign Out
                </button>
              </div>

                <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 hidden lg:block">
                <h4 className="font-medium text-charcoal mb-3 text-sm">Quick Links</h4>
                <div className="space-y-2">
                    <Link to="/orders" className="block text-sm text-gray-600 hover:text-gold transition-colors">
                    <i className="ri-file-list-line mr-2"></i>My Orders
                    </Link>
                    <Link to="/wishlist" className="block text-sm text-gray-600 hover:text-gold transition-colors">
                    <i className="ri-heart-line mr-2"></i>Wishlist
                    </Link>
                </div>
                </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-charcoal">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-gold hover:text-gold-dark font-medium flex items-center gap-1"
                  >
                    <i className={`ri-${isEditing ? 'close-' : ''}edit-line`}></i>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg opacity-60 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Gender</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="submit"
                      className="w-full md:w-auto mt-6 bg-gold text-white px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors"
                    >
                      Save Changes
                    </motion.button>
                  )}
                </form>
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold text-charcoal">My Addresses</h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="bg-gold text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-dark transition-colors flex items-center gap-2"
                  >
                    <i className="ri-add-line"></i>
                    Add Address
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-2xl p-6 shadow-sm relative">
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 bg-gold/10 text-gold text-xs px-2 py-1 rounded-full font-medium">
                          Default
                        </span>
                      )}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`ri-${address.type === 'Home' ? 'home-4' : 'building'}-line text-gray-600`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{address.type}</p>
                          <p className="text-sm text-gray-600">{address.name}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1 ml-13">
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip}</p>
                        <p>{address.phone}</p>
                      </div>
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button className="text-sm text-gray-600 hover:text-gold transition-colors flex items-center gap-1">
                          <i className="ri-edit-line"></i> Edit
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-sm text-gray-600 hover:text-gold transition-colors flex items-center gap-1"
                          >
                            <i className="ri-check-line"></i> Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(address.id)}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <i className="ri-delete-bin-line"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Address Modal */}
                {showAddAddress && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full"
                    >
                      <h3 className="text-xl font-serif font-bold text-charcoal mb-6">Add New Address</h3>
                      <form onSubmit={handleAddAddress} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">Address Type</label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal mb-2">Street Address</label>
                          <input
                            type="text"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">City</label>
                            <input
                              type="text"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">State</label>
                            <input
                              type="text"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">ZIP Code</label>
                            <input
                              type="text"
                              value={newAddress.zip}
                              onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                            <input
                              type="tel"
                              value={newAddress.phone}
                              onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowAddAddress(false)}
                            className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-gold text-white py-3 rounded-lg text-sm font-medium hover:bg-gold-dark transition-colors"
                          >
                            Save Address
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gold text-white px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Preferences</h2>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <h3 className="font-medium text-charcoal mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                        <span className="text-sm text-gray-600">Order updates and delivery notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                        <span className="text-sm text-gray-600">New product launches and promotions</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                        <span className="text-sm text-gray-600">Beauty tips and tutorials</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-charcoal mb-3">Skin Type</h3>
                    <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors">
                      <option value="">Select your skin type</option>
                      <option value="normal">Normal</option>
                      <option value="oily">Oily</option>
                      <option value="dry">Dry</option>
                      <option value="combination">Combination</option>
                      <option value="sensitive">Sensitive</option>
                    </select>
                  </div>

                  <button className="bg-gold text-white px-8 py-3 rounded-lg uppercase text-sm tracking-wider font-medium hover:bg-gold-dark transition-colors">
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;