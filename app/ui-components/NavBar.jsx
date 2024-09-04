
export default function DashBoard(props) {
  return (
    <>
      <nav className="bg-[#003135] h-20 w-full mb-4 flex rounded-[10px] ">
        <h4 className="self-center pl-4 pr-4 justify-start flex-1">
          Hello Vigneshwar !
        </h4>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border self-center justify-center flex-1 border-gray-300 h-14 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search transactions..."
          required
        />
        <button className="w-6 h-6 self-center flex-1 pl-4 justify-end ">
          <svg
            className="  text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
      </nav>
    </>
  );
}
