import { Link } from "react-router-dom";

export default function NotFoutdPage() {
  return (
    <div className="flex h-full w-full text-white items-center justify-center">
      <div className="flex flex-col text-center text-white">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <Link
          to="/"
          className="mt-8 px-20 py-2 rounded-md bg-transparent hover:bg-gray-200 ring-1 ring-gray-200 transition duration-150 ease-out hover:ease-in"
        >
          <h4>На главную</h4>
        </Link>
      </div>
    </div>
  );
}
