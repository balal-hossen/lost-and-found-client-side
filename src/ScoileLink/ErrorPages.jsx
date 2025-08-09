import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const ErrorPages = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-center px-4">
      <Helmet>
        <title>Page Not Found | WhereIsIt</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      {/* Error Image */}
      <img
        src="https://i.ibb.co.com/B2gzNK08/Error.jpg"
        className="w-full max-w-md mb-8"
      />

      {/* Title */}
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Oops! Page Not Found
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default ErrorPages;
