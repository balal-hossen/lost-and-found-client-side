export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        👋 Welcome to Your Dashboard
      </h1>
      <p className="text-gray-600 max-w-md">
        Here you can manage your lost and found items, view recovered items, and
        keep everything organized in one place.
      </p>
    </div>
  );
}
