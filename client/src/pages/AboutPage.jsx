import { motion } from 'framer-motion';

const AboutPage = () => {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Products' },
    { value: '1M+', label: 'Happy Customers' },
    { value: '50+', label: 'Cities' },
  ];

  const values = [
    {
      icon: 'ri-heart-pulse-line',
      title: 'Quality First',
      description: 'We never compromise on quality. Every product undergoes rigorous testing before reaching you.'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Cruelty Free',
      description: 'All our products are cruelty-free. We believe beauty should never come at the cost of animal welfare.'
    },
    {
      icon: 'ri-global-line',
      title: 'Sustainability',
      description: 'We\'re committed to reducing our environmental footprint with eco-friendly packaging and practices.'
    },
    {
      icon: 'ri-hand-heart-line',
      title: 'Inclusivity',
      description: 'Beauty for everyone. Our products are designed for all skin types, tones, and textures.'
    },
  ];

  const team = [
    { name: 'Sarah Ahmed', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Ayesha Khan', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
    { name: 'Fatima Raza', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
    { name: 'Zainab Ali', role: 'Marketing Head', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-nude-light to-white overflow-hidden">
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-6">
              Beauty That Empowers
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Since 2014, Silk Hue has been on a mission to make premium beauty accessible to everyone. 
              We believe that beauty is not just about looking good, it&apos;s about feeling confident and empowered.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
                alt="Our Mission"
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Silk Hue, we&apos;re dedicated to creating high-quality, affordable beauty products that 
                celebrate diversity and empower individuals to express their unique beauty.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every product we create is the result of extensive research, premium ingredients, and 
                a deep understanding of what our customers need. We&apos;re not just selling beauty products, we&apos;re 
                building a community of confident, empowered individuals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Our Values</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">What we stand for</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-2xl text-gold`}></i>
                </div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Meet Our Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The passionate people behind Silk Hue</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-serif font-bold text-charcoal">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;