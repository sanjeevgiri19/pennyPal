const NotFound = () => {
  return (
    <section>
      <div className=" text-white">
        <div className="flex h-screen">
          <div className="m-auto text-center">
            <div>
              <img
                src="https://cdn3.iconfinder.com/data/icons/web-development-and-programming-2/64/development_Not_Found-1024.png"
                alt="404"
                className="w-64 h-72"
              />
            </div>
            <p className="text-sm md:text-base text-green-500 p-2 mb-4">
              The stuff you were looking for doesnt exist
            </p>
            <a
              href="/"
              className="bg-green-100/80 hover:bg-green-400 text-green-500 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-green-600 hover:border-transparent"
            >
              Take me home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
