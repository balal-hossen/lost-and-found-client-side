// src/pages/error/ErrorPage.jsx

import { useRouteError } from "react-router";



const ErrorPages = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-red-500">404 - Not Found</h1>
      <p className="text-lg mt-4">এই পেজটি খুঁজে পাওয়া যায়নি!</p>
      <p className="mt-2 text-sm text-gray-500">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPages;
