"use client";
import { Doughnut } from "react-chartjs-2";
import { BackgroundBeams } from "../components/ui/Background-beams";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdLogout } from "react-icons/md";
import Cards from "../components/Cards";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { useEffect, useState } from "react";
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import TransactionForm from "../components/TransactionForm";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);
  // console.log("transaction statistics data", data);

  const { data: authUserData } = useQuery(GET_AUTH_USER);
  // console.log("authUserData", authUserData);

  const [logout, { loading, client }] = useMutation(LOGOUT, {
    // refetchQueries: [{ query: GET_AUTH_USER }],

    refetchQueries: ["GetAuthUsers"],
    // [{ query: GET_AUTH_USER }],
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 4,
        spacing: 8,
        cutout: 120,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmount = data?.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];
      const labels = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192, 0.9)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132, 0.9)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235, 0.9)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmount,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));

      //here the colors of chart are randomly generated in every refresh

      // categories.forEach((category) => {
      //   labels.push(category)
      //   const r = Math.floor(Math.random() * 255);
      //   const g = Math.floor(Math.random() * 255);
      //   const b = Math.floor(Math.random() * 255);
      //   backgroundColor.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
      //   borderColor.push(`rgba(${r}, ${g}, ${b}, 1)`);
      // });

      // setChartData({
      //   labels,
      //   datasets: [
      //     {
      //       label: "$",
      //       data: totalAmount,
      //       backgroundColor,
      //       borderColor,
      //       borderWidth: 1,
      //       borderRadius: 30,
      //       spacing: 10,
      //       cutout: 130,
      //     },
      //   ],
      // });
    }
  }, [data]);
  const handleLogout = async () => {
    console.log("bsfeybghuds");

    try {
      const { data } = await logout();
      console.log("Logout response:", data);

      // Sometimes, you might want to reset the cache entirely, such as when a user logs out.
      //  To accomplish this, call client.resetStore.
      //  This method is asynchronous, because it also refetches any of your active queries.
      //when i doesn't reset the cache, ma vanda paila jo user thiyo usko transaction aauxa mero dashboard ma,
      // and i need to refresh the page to fetch mine, there are others methods also, such as: bypassing cache, persisting cache etc.
      //  Read documentation for better understanding

      client.resetStore();
    } catch (error) {
      console.error("Error logging out", error);
      toast.error(error.message);
    }

    // console.log("Logging out ...");
  };

  return (
    <div className="min-h-screen max-w-full gap-6 rounded-md bg-black relative flex flex-col items-center   mx-auto z-20  antialiased">
      {/* {authUser && <Header />} */}
      <div className="flex items-center">
        <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent mt-10 bg-clip-text">
          Spend wisely, track wisely
        </p>

        <img
          src={authUserData?.authUser?.profilePicture}
          className="w-10 h-10 rounded-full border cursor-pointer"
          alt="Avatar"
        />

        {!loading && (
          <button onClick={handleLogout} className="relative z-50">
            <MdLogout className="mx-2 w-5 h-5 text-zinc-300/80 cursor-pointer" />
          </button>
        )}

        {loading && (
          <div className="w-6 h-6 border-t-2 border-white border-b-2 mx-2 rounded-full animate-spin"></div>
        )}
      </div>

      <div className="flex z-40 flex-wrap w-screen justify-center items-center gap-16">
        {data?.categoryStatistics.length > 0 && (
          <div className="h-[330px] w-[330px] md:h-[330px] md:w-[330px]  ">
            <Doughnut data={chartData} />
          </div>
        )}

        <TransactionForm />
        <Cards />
        {/* <CardTrans /> */}
      </div>

      {/* <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
        </h1>
      </div> */}

      <BackgroundBeams />
    </div>
  );
};

export default Home;
