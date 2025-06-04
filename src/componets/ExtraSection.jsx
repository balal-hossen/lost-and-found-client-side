import { motion } from "framer-motion";

const ExtraSection = () => {
  return (
    <motion.section
      className="bg-gray-100 p-6 rounded-xl mx-4 md:mx-16"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-3">Tips to Find Lost Items</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Post quickly after you lose something</li>
        <li>Include clear photos and details</li>
        <li>Check the Recovered section daily</li>
      </ul>
    </motion.section>
  );
};

export default ExtraSection;
