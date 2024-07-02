import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="flex justify-center flex-1 items-center">
      <div className="flex flex-col text-center items-center justify-center gap-2 relative z-40 h-min-content px-32 content-home">
        <Link
          to="/Quotations"
          className="px-20 py-2 rounded-md hover:bg-gray-50/20 ring-1 ring-gray-200 transition duration-150 ease-out hover:ease-in home-btn bg-neutral-900/10"
        >
          <h4 className="text-white manrope font-light animate-pulse">
            Котировки
          </h4>
        </Link>
        <h4 className="text-white manrope font-bold mt-20 select-none home-h4">
          API Poloniex
        </h4>
        <h1 className="py-2 manrope font-semibold leading-[3.15rem] select-none  bg-gradient-to-br from-white to-white/50 text-transparent bg-clip-text home-h1">
          Актуальный курс
          <br />
          валют на криптобирже
        </h1>
      </div>
      <div className=" absolute top-0 bottom-0 left-0 right-0 w-full ">
        <div className="cyrcle"></div>
        <div className="bg-cyan-300 absolute top-0 bottom-0 left-0 right-0 w-full mix-blend-color z-20"></div>
        <div className="back flex w-full h-full z-10"></div>
      </div>
    </div>
  );
}
