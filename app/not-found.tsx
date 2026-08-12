import { Link } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Page not found</p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
