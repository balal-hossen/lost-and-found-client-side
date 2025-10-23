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
        className=" p-6 md:p-10 rounded-3xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8  underline">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Report Lost Item',
              desc: 'Submit the details of your lost item. The community will help you recover it quickly and securely.',
            },
            {
              title: 'Browse Found Items',
              desc: 'Check listings added by others who found items. You might find yours there!',
            },
            {
              title: 'Get Reunited',
              desc: 'Contact the finder and retrieve your item through proper validation and safety measures.',
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className=" rounded-2xl shadow-md hover:shadow-xl transition p-6 h-full flex flex-col justify-start"
            >
              <h3 className="text-lg sm:text-xl font-semibold  mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base text-center leading-relaxed">
                {step.desc}
              </p>
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
        className="p-6 md:p-10 rounded-3xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-green-800">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'Secure & Trusted',
            'Easy to Use',
            'Real-Time Updates',
            'Fast Communication',
          ].map((reason, idx) => (
            <motion.div
              key={idx}
              whileHover={{ rotate: [0, -2, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
              className=" rounded-2xl shadow-md hover:shadow-xl p-6 h-full flex items-center justify-center"
            >
              <p className="text-base sm:text-lg font-medium text-green-700 text-center leading-snug">
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraSections;
