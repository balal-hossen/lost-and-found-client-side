import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co/1f3gQy3v/img1.jpg", // make sure all images are same ratio (e.g., 16:9)
    title: "Lost Something?",
    subtitle: "We help you reconnect with what matters.",
    animation: { x: 0, y: -100 }, // top
  },
  {
    id: 2,
    img: "https://i.ibb.co/D3YQt8j/img2.jpg",
    title: "Found an Item?",
    subtitle: "Post it and help someone smile again.",
    animation: { x: -100, y: 0 }, // left
  },
  {
    id: 3,
    img: "https://i.ibb.co/j9cMf0bD/img4.jpg",
    title: "Community Support",
    subtitle: "Be part of a helpful community.",
    animation: { x: 100, y: 0 }, // right
  },
  {
    id: 4,
    img: "https://i.ibb.co/p6FYqBNZ/img5.jpg",
    title: "Report Lost Pets or Items",
    subtitle: "We’ll help you find them back.",
    animation: { x: 0, y: 100 }, // bottom
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { img, title, subtitle, animation } = slides[current];

  return (
    <div className="relative w-full overflow-hidden  shadow-md"
         style={{aspectRatio: "16 / 9", maxHeight: "600px"}}>
      <img
        src={img}
        alt="Banner"
        className="w-full h-full object-cover brightness-75"
        loading="lazy"
      />
      <motion.div
        key={current}
        initial={{ opacity: 0, ...animation }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{title}</h2>
        <p className="text-lg md:text-xl drop-shadow-md">{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default BannerSlider;
