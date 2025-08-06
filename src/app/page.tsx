export default function HomePage() {
  return (
    <div className="m-10 text-center">
      <h1 className="font-bold text-6xl">Welcome to Ex Libris</h1>
      <h3 className="font-semibold text-2xl mt-3">
        {" "}
        Find your next great read by giving one away.
      </h3>

      <div className="flex items-center justify-center p-4 mt-2">
        <form className="flex rounded-xl overflow-hidden border border-bg-[#5b2c31]] bg-[#fdf6ee] w-full max-w-xl">
          <input
            type="text"
            placeholder="Search books by title, author, or genre"
            className="flex-grow px-4 py-4 text-[#444] bg-transparent outline-none placeholder:text-[#999]"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-[#5b2c31] text-white font-semibold hover:bg-[#c55f1e] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="m-4 items-center">
        <h3 className="font-bold text-4xl">How It Works</h3>
      </div>
    </div>
  );
}
