
const HeroImage = () => {
  return (
    <section className="pt-12 pb-20 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-opacity-30 z-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#e2e8f0"
            fillOpacity="0.5"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#4b5563"
            fillOpacity="0.2"
            d="M0,160L48,138.7C96,117,192,75,288,64C384,53,480,75,576,96C672,117,768,139,864,128C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent z-10"></div>
          <img
            src="/moneysave.jpg"
            alt="Himalayan Financial Dashboard"
            className="w-full h-auto rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
