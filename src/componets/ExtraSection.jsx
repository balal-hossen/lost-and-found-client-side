// src/components/ExtraSections.jsx
import { motion } from 'framer-motion';

const ExtraSections = () => {
  return (
    <div className="px-4 md:px-8 py-12 space-y-16">
      {/* Section 1: How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-50 to-purple-100 p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-800">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              title: 'Report Lost Item',
              desc: 'Submit details of what you lost. The community will help you find it.'
            },
            {
              title: 'Browse Found Items',
              desc: 'Check items found by others and listed by the community.'
            },
            {
              title: 'Get Reunited',
              desc: 'Communicate and retrieve your item with proper validation.'
            }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section 2: Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-green-50 to-teal-100 p-8 rounded-3xl shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-800">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            'Secure & Trusted',
            'Easy to Use',
            'Real-Time Updates',
            'Fast Communication'
          ].map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ rotate: [0, -2, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl"
            >
              <p className="text-lg font-medium text-green-700">{reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraSections;
