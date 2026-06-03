import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Makeup', href: '/makeup' },
    { name: 'Skin Care', href: '/skincare' },
    { name: 'Hair Care', href: '/haircare' },
    { name: 'Fragrances', href: '/fragrances' },
    { name: 'Collections', href: '/collections' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-charcoal"
          >
            <i className={`text-2xl ${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>

          {/* Desktop Navigation - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm uppercase tracking-wider text-charcoal hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo - Center */}
          <Logo />

          {/* Desktop Navigation - Right + Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm uppercase tracking-wider text-charcoal hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button className="text-charcoal hover:text-gold transition-colors">
              <i className="ri-search-line text-xl"></i>
            </button>
            
            <button className="text-charcoal hover:text-gold transition-colors hidden sm:block">
              <i className="ri-heart-line text-xl"></i>
            </button>
            
            <button className="text-charcoal hover:text-gold transition-colors hidden sm:block">
              <i className="ri-user-line text-xl"></i>
            </button>
            
            <button className="relative text-charcoal hover:text-gold transition-colors">
              <i className="ri-shopping-cart-line text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block py-3 text-sm uppercase tracking-wider text-charcoal hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
