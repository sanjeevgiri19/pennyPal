import React from "react";

const logos = [
  // use as many logo as possible
  {
    id: 1,
    src: "https://images.pexels.com/photos/30833249/pexels-photo-30833249/free-photo-of-swayambhunath-stupa-in-kathmandu-at-twilight.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Logo 1",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/12226987/pexels-photo-12226987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Logo 2",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1274922/pexels-photo-1274922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Logo 3",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/30153989/pexels-photo-30153989/free-photo-of-traditional-masked-dance-festival-in-nepal.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    alt: "Logo 4",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/8784141/pexels-photo-8784141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Logo 4",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/10634688/pexels-photo-10634688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Logo 4",
  },
];

const LogoSlider = () => {
  // Duplicating logos for seamless animation
  const extendedLogos = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-zinc-100 py-10">
      <div className="relative">
        <div className="flex animate-slide">
          {extendedLogos.map((logo) => (
            <div
              key={logo.id}
              className="flex-shrink-0 w-32 mx-4 h-16  flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain   hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS in a style tag or separate CSS file */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 60s linear infinite;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogoSlider;
