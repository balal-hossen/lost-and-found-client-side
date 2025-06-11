import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Logo = () => {
  const name = "WhereIsIt";
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A67CE", "#F67280", "#2EC4B6", "#FF9F1C", "#3D348B", "#EF476F"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-2xl font-bold tracking-wide flex items-center gap-2"
    >
      <span className="hidden lg:inline-block w-8 h-8">
        {/* তুমি চাইলে এখানে কোন logo icon দিতে পারো */}
        📦
      </span>

      <Typewriter
        words={[name]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={2000}
      />

      {/* আলাদা রঙের letter এক এক করে animate করা */}
      <div className="flex gap-1 ml-4">
        {name.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            style={{ color: colors[index % colors.length], fontWeight: 'bold', fontSize: "20px" }}
          >
            <p className='hidden lg:block md:block'>
             {char}
            </p>
           
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Logo;
