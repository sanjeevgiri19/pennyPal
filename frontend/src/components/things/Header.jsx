import React from "react";
import HomeCard from "../layout/HomeCard";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import LogoSlider from "./LogoSlider";
import himal1 from "/himal1.jpg";
import HeroImage from "./HeroImage";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../../graphql/queries/user.query";

const Header = () => {
  const { data } = useQuery(GET_AUTH_USER);
  // console.log(data);

  return (
    <div className="bg-zinc-50 relative z-50 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-1 himalaya-gradient">
          <svg
            className="absolute bottom-0 left-0 w-full h-1/2 opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#166534"
              fillOpacity="0.3"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,160C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-mountain-drift-1"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 w-full h-1/2 opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#0e4d2c"
              fillOpacity="0.4"
              d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,181.3C672,171,768,117,864,106.7C960,96,1056,128,1152,128C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="animate-mountain-drift-2"
            />
          </svg>
        </div>
      </div>
      <div className="relative z-10 pt-10">
        <h2 className="text-md text-green-700 mx-auto text-center rounded-full w-72 bg-green-200/70">
          Financial Clarity, Financial Freedom.
        </h2>

        <h2 className="flex flex-col text-center items-center justify-center text-4xl mt-6 md:text-4xl lg:text-[5xl] text-[#020817] font-bold">
          Manage Your Expenses with
          <span className="block text-4xl md:text-[4xl] lg:text-[5xl] mt-2 text-green-700">
            Effortless Clarity
          </span>
        </h2>

        <h2 className="text-zinc-600 text-[17px] sm:text-[19px] md:text-[20px] lg:text-[21px] mx-auto w-[73%] sm:w-[76%]  lg:w-[72%] mt-10 text-center">
          Track expenses, manage budgets, and gain insights with our intuitive
          finance management app. Designed with simplicity and elegance in mind.
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="button  mt-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-8 p-2">
          {data.authUser ? (
            <Link
              to="/transactions"
              className="bg-green-600 hover:bg-green-700/80 rounded-full text-white text-md px-7 py-2"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700/80 rounded-full text-white text-[18px] px-12 py-2"
            >
              Login
            </Link>
          )}

          <Link
            to="/about"
            className="bg-transparent border-[1px] border-green-300 hover:bg-green-300/60 rounded-full text-green-800 text-md px-5 py-2"
          >
            Learn more <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>

      <div className="bg-zinc-50 pt-">
        {/* <img
          src="/moneysave.jpg"
          alt=""
          className="w-[90%] sm:w-[70%] md:w-[80%] lg:w-[65%] bg-gradient-to-b from-white to-gray-50 h-[50vh] sm:h-[62vh] md:h-[70vh] lg:h-[75vh] mx-auto rounded-xl"
        /> */}
        <HeroImage />
      </div>

      <div className="pt-20 bg-zinc-50 ">
        <h2 className="text-sm text-green-700 mx-auto text-center rounded-full w-28 py-1 bg-green-200/50">
          Key Features
        </h2>

        <h2 className="flex flex-col text-center items-center justify-center text-4xl mt-6 md:text-4xl text-[#020817] font-bold">
          Everything you need to manage your finances
        </h2>

        <h2 className="text-zinc-600 text-[19px] mx-auto w-[80%]  sm:w-[85%]  lg:w-[80%] mt-6 px-5 text-center">
          Clarity comes with all the tools you need to track, analyze, and
          improve your financial health.
        </h2>
      </div>
      <HomeCard />
      {/* <Testimonials /> */}
      <LogoSlider />

      <div
        className="bg-zinc-50 mt-6 filter brightness-90 contrast-125 grayscale-[10%] bg-cover bg-center py-30"
        style={{ backgroundImage: `url(${himal1})` }}
      >
        <h2 className="flex flex-col text-center items-center justify-center text-4xl mt-6 z-30 md:text-4xl text-white font-bold">
          Ready to take control of your finances?
        </h2>

        <h2 className="text-zinc-100 z-10 text-[19px] mx-auto w-[48%] mt-6 px-5 text-center">
          Join thousands of users who have transformed their financial habits
          with Clarity. Start your journey towards financial freedom today.
        </h2>

        {data.authUser ? (
          <Link
            to="/transactions"
            className="mx-auto flex text-sm justify-center mt-8 w-44 text-green-600 font-medium bg-zinc-50 px-5 py-2 rounded-full"
          >
            Get Started Now{" "}
            <i className="ri-arrow-right-line ml-1 mt-[1px]"></i>
          </Link>
        ) : (
          <Link
            to="/login"
            className="mx-auto flex text-sm justify-center mt-8 w-36 text-green-600 hover:bg-green-100/90 hover:text-md font-medium bg-zinc-50 px-5 py-2 rounded-full"
          >
            Login Now
          </Link>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Header;
