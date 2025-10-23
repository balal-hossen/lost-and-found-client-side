import React from "react";

const HeartPage = () => {
  return (
   <div>
     <div className="flex items-center justify-center h-screen font-sans">
      {/* Inline CSS style tag for pseudo-elements and keyframes */}
      <style>{`
        .heart-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20rem;
        }

        .heart {
          position: absolute;
          width: 200px;
          height: 180px;
        }

        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          width: 100px;
          height: 160px;
          border-radius: 100px 100px 0 0;
          border: 5px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(45deg, red, yellow, green, blue, violet);
          animation: colorShift 3s linear infinite;
        }

        .heart::before {
          left: 100px;
          transform: rotate(-45deg);
          transform-origin: 0 100%;
        }

        .heart::after {
          left: 0;
          transform: rotate(45deg);
          transform-origin: 100% 100%;
        }

        @keyframes colorShift {
          0% { border-image-source: linear-gradient(45deg, red, orange, yellow, green, blue, violet); }
          50% { border-image-source: linear-gradient(45deg, violet, blue, green, yellow, orange, red); }
          100% { border-image-source: linear-gradient(45deg, red, orange, yellow, green, blue, violet); }
        }

        .heart-text {
          position: absolute;
          color: blue;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 50px;
        }
      `}</style>

      {/* Heart container */}
      <div className="heart-container">
        <div className="heart"></div>
        <div className="heart-text">User Dashboard</div>
      </div>
    </div>
     <div className="flex flex-col -mt-90 items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        👋 Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 max-w-md">
        Here you can manage your lost and found items, view recovered items, and
        keep everything organized in one place.
      </p>
    </div>
   </div>
  );
};

export default HeartPage;
