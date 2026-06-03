import { useState } from 'react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gold text-white relative">
      <div className="container-custom py-2 text-center text-sm font-medium tracking-wider">
        FREE DELIVERY ON ORDERS ABOVE RS. 1999
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
};

export default AnnouncementBar;
