import { motion } from 'framer-motion';

const benefits = [
  {
    icon: 'ri-truck-line',
    title: "Fast Delivery",
    description: "Free shipping on orders above Rs. 1,999"
  },
  {
    icon: 'ri-shield-check-line',
    title: "Secure Payment",
    description: "100% secure and encrypted checkout"
  },
  {
    icon: 'ri-verified-badge-line',
    title: "Authentic Products",
    description: "100% genuine beauty products guaranteed"
  },
  {
    icon: 'ri-customer-service-2-line',
    title: "Customer Support",
    description: "24/7 dedicated customer service team"
  }
];

const BrandBenefits = () => {
  return (
    <section className="py-16 border-t border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-nude-light rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${benefit.icon} text-gold text-2xl`}></i>
              </div>
              <h3 className="font-bold text-charcoal mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBenefits;
