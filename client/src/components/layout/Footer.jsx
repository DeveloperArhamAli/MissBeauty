import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div>
            <h3 className="text-3xl font-sourgumyy font-bold mb-6">
              SILK<span className="text-gold">HUE</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Premium beauty and cosmetics brand committed to enhancing your natural beauty 
              with high-quality, affordable products.
            </p>
            <div className="flex gap-3">
              {['ri-facebook-fill', 'ri-instagram-fill', 'ri-twitter-fill', 'ri-youtube-fill'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold transition-colors"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Contact Us', 'Store Locator', 'Affiliate Program'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-bold mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {['Shipping Information', 'Returns & Exchange', 'FAQs', 'Track Order', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <i className="ri-map-pin-line text-lg flex-shrink-0 mt-0.5 text-gold"></i>
                <span className="text-sm">123 Beauty Street, Lahore, Pakistan 54000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <i className="ri-phone-line text-lg flex-shrink-0 text-gold"></i>
                <span className="text-sm">+92 42 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <i className="ri-mail-line text-lg flex-shrink-0 text-gold"></i>
                <span className="text-sm">info@silkhue.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 SILK HUE. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-gold transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
