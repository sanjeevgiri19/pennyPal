import { useEffect, useState } from "react";
import Navbar from "../components/things/Navbar";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GET_TRANSACTIONs } from "../graphql/queries/transaction.query";
import DropdownMenu from "../components/ui/Dropdown";
import Footer from "../components/things/Footer";
import Loading from "../components/things/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoard = () => {
  const { loading, data } = useQuery(GET_TRANSACTION_STATISTICS);

  // console.log("Query Status:", { loading, error, data });

  // console.log("data", data);

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

  const [totals, setTotals] = useState({
    totalSaving: 0,
    totalExpense: 0,
    totalInvestment: 0,
    totalBalance: 0,
  });

  // console.log(data?.categoryStatistics);

  useEffect(() => {
    // console.log("data in useeffect:", data);

    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmount = data?.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

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

      const totalSaving = data.categoryStatistics
        .filter((stat) => stat.category === "saving")
        .reduce((sum, stat) => sum + stat.totalAmount, 0);

      const totalExpense = data.categoryStatistics
        .filter((stat) => stat.category === "expense")
        .reduce((sum, stat) => sum + stat.totalAmount, 0);

      const totalInvestment = data.categoryStatistics
        .filter((stat) => stat.category === "investment")
        .reduce((sum, stat) => sum + stat.totalAmount, 0);

      const totalIncome = totalSaving + totalExpense + totalInvestment;
      const totalBalance = totalIncome - (totalExpense + totalInvestment);

      setTotals({
        totalIncome,
        totalSaving,
        totalExpense,
        totalInvestment,
        totalBalance,
      });
    }
  }, [data]);

  // Transaction table state and query
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useQuery(GET_TRANSACTIONs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryOptions = [
    { label: "All" },
    { label: "Income" },
    { label: "Expense" },
    { label: "Investment" },
  ];

  const handleCategorySelect = (item) => {
    setSelectedCategory(item.label);
  };

  const filteredTransactions =
    transactionsData?.transactions?.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Income" &&
          (transaction.category === "saving" ||
            transaction.category === "investment")) ||
        transaction.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    }) || [];

  if (loading) return <Loading />;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navbar />
      <div className="flex justify-between px-16 py-10 ">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-3 sm:p-3 md:p-2 lg:p-1 mx-auto gap-10">
          <div className="border-[2px] rounded-md flex gap-4 border-zinc-200 px-10 py-7">
            <div className="flex flex-col">
              <h2 className="text-md text-zinc-600">Total Income</h2>
              <h3 className="text-2xl font-bold">${totals.totalIncome}</h3>
              <span className="bg-blue-200/50 mt-2 w-16 text-sm px-2 py-1 rounded-full text-blue-600 font-medium"></span>
            </div>
            <i className="ri-wallet-3-line text-3xl bg-blue-200/80 w-12 h-12 flex justify-center items-center text-blue-700 rounded-full"></i>
          </div>

          <div className="border-[2px] rounded-md flex gap-4 border-zinc-200 px-10 py-7">
            <div className="flex flex-col">
              <h2 className="text-md text-zinc-600">Total Balance</h2>
              <h3 className="text-2xl font-bold">${totals.totalBalance}</h3>
              <span className="bg-green-200/50 mt-2 w-16 text-sm px-2 py-1 rounded-full text-green-600 font-medium"></span>
            </div>
            <i className="ri-arrow-up-circle-line text-3xl bg-green-200/80 w-12 h-12 flex justify-center items-center text-green-700 rounded-full"></i>
          </div>

          <div className="border-[2px] rounded-md flex gap-4 border-zinc-200 px-10 py-7">
            <div className="flex flex-col">
              <h2 className="text-md text-zinc-600">Total Expenses</h2>
              <h3 className="text-2xl font-bold">${totals.totalExpense}</h3>
              <span className="bg-red-200/50 mt-2 w-16 text-sm px-2 py-1 rounded-full text-green-600 font-medium"></span>
            </div>
            <i className="ri-arrow-down-circle-line text-3xl bg-red-200/80 w-12 h-12 flex justify-center items-center text-red-700 rounded-full"></i>
          </div>

          <div className="border-[2px] rounded-md flex gap-4 border-zinc-200 px-10 py-7">
            <div className="flex flex-col">
              <h2 className="text-md text-zinc-600">Total Investments</h2>
              <h3 className="text-2xl font-bold">${totals.totalInvestment}</h3>
              <span className="bg-purple-200/50 mt-2 w-16 text-sm px-2 py-1 rounded-full text-green-600 font-medium"></span>
            </div>
            <i className="ri-home-smile-line text-3xl bg-purple-200/80 w-12 h-12 flex justify-center items-center text-purple-700 rounded-full"></i>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex justify-center items-center mt-20">
            {data?.categoryStatistics.length > 0 && (
              <div className="h-[320px] w-[320px] md:h-[340px] md:w-[330px] lg:h-[340px] lg:w-[330px]">
                <Doughnut data={chartData} />
              </div>
            )}
          </div>

          <div className="mt-10 h-[60vh] w-[98vh] px-16">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md p-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center mb-4">
                {/* <span className="mr-2 text-gray-600"></span> */}
                <DropdownMenu
                  title={selectedCategory}
                  items={categoryOptions}
                  onSelect={handleCategorySelect}
                />
              </div>
            </div>
            <div className="overflow-x-auto overflow-y-auto h-[50vh]">
              <table className="w-full border-collapse">
                <tbody>
                  {transactionsLoading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Loading transactions...
                      </td>
                    </tr>
                  ) : transactionsError ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-red-500">
                        Error loading transactions: {transactionsError.message}
                      </td>
                    </tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500"
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-t border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-4 pl-4">
                          <div className="flex items-center">

                            {/* {transaction.category === "expense" ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-red-100 rounded-full text-red-500">
                              ↓
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-5 h-5 mr-2 bg-green-100 rounded-full text-green-500">
                              ↑
                            </span>
                          )} */}

                            <div>
                              <p className="font-medium">
                                {transaction.description}
                              </p>
                              <p className="text-sm text-gray-500">
                                {transaction.category.charAt(0).toUpperCase() +
                                  transaction.category.slice(1)}
                              </p>
                            </div>
                          </div>
                        </td>

                        
                        <td className="py-4 pr-4 text-right">
                          <span
                            className={`font-medium ${
                              transaction.category === "expense"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {transaction.category === "expense" ? "$" : "+$"}
                            {transaction.amount.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
