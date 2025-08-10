import React from "react";
import { Helmet } from "react-helmet";

const About = ({ theme }) => {
  // theme = "dark" অথবা "light"

  return (
    <div
      className={`container mx-auto px-4 py-10 min-h-screen
        ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      <Helmet>
        <title>WhereIsIt | About Us</title>
      </Helmet>

      <h1 className="text-5xl font-bold mb-8 text-center">
        About WhereIsIt
      </h1>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg leading-relaxed">
          WhereIsIt was founded in 2024 with a mission to help people reconnect with
          their lost belongings quickly and safely. We understand how stressful
          losing an important item can be, and we strive to provide a trusted
          platform that brings communities together to find and recover lost items.
        </p>
      </section>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          To create a reliable and easy-to-use lost and found service that
          connects people and fosters community support, making lost items
          recovery hassle-free.
        </p>
      </section>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          To be the leading lost and found platform worldwide, empowering
          communities through technology and care.
        </p>
      </section>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member 1"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">Belal Khan</h3>
            <p>Founder & Lead Developer</p>
          </div>

          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member 2"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">Sarah Ahmed</h3>
            <p>Product Manager</p>
          </div>

          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/men/54.jpg"
              alt="Team Member 3"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
            />
            <h3 className="text-xl font-bold">Rafiq Islam</h3>
            <p>Community Manager</p>
          </div>
        </div>
      </section>

      <section className="mb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg mb-2">
          Email: <a href="mailto:support@whereisit.com" className={`underline ${theme === "dark" ? "text-white" : "text-black"}`}>support@whereisit.com</a>
        </p>
        <p className="text-lg mb-2">
          Phone: <a href="tel:+880123456789" className={`underline ${theme === "dark" ? "text-white" : "text-black"}`}>+880 1234 56789</a>
        </p>
        <p className="text-lg">
          Address: 123, Lost & Found Street, Dhaka, Bangladesh
        </p>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <p className="italic">Thank you for visiting WhereIsIt!</p>
      </section>
    </div>
  );
};

export default About;
