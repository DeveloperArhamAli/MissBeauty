import { useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/shop' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Logo />

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <i className="ri-search-line text-xl"></i>
            </button>

            <button className="hidden sm:block text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <i className="ri-heart-line text-xl"></i>
            </button>

            <button className="relative text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <i className="ri-shopping-cart-line text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="hidden sm:block text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <i className="ri-user-line text-xl"></i>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <i className="ri-close-line text-2xl"></i>
              ) : (
                <i className="ri-menu-line text-2xl"></i>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
                <i className="ri-heart-line mr-2"></i>
                Wishlist
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
                <i className="ri-user-line mr-2"></i>
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;