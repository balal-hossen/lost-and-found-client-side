import { motion } from "framer-motion";

const ExtraSectionTwo = () => {
  return (
    <motion.section
      className="bg-blue-50 p-6 rounded-xl mx-4 md:mx-16"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-3">Why Use WhereIsIt?</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow text-center"> Smart Search</div>
        <div className="p-4 bg-white rounded shadow text-center"> Location-based Filtering</div>
        <div className="p-4 bg-white rounded shadow text-center"> Verified Posts</div>
      </div>
    </motion.section>
  );
};

export default ExtraSectionTwo;
