import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 md:flex-row md:justify-between md:items-center text-center md:text-left">
        
        {/* Left side */}
        <div>
          <h1 className="text-2xl font-bold text-white">WhereIsIt</h1>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()} WhereIsIt. All rights reserved.</p>
        </div>

        {/* Middle navigation */}
        <nav>
          <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-white transition">Home</a>
            </li>
            <li>
              <a href="/lostpages" className="hover:text-white transition">Lost & Found</a>
            </li>
            <li>
              <a href="/addlost" className="hover:text-white transition">Add Item</a>
            </li>
            <li>
              <a href="/manage" className="hover:text-white transition">Manage My Items</a>
            </li>
            <li>
              <a href="/allrecoverd" className="hover:text-white transition">Recovered Items</a>
            </li>
          </ul>
        </nav>

        {/* Right side contact */}
        <div className="text-sm">
          <p>
            Contact:{" "}
            <a
              href="mailto:belalkhanloverboy2004@gmail.com"
              className="underline hover:text-white transition break-all"
            >
              belalkhanloverboy2004@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
