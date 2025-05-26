import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/dateFormat";
import toast from "react-hot-toast";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import { useState, useEffect } from "react";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({ transaction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { amount, paymentType, category, description, location, date } =
    transaction;
  const cardClass = categoryColorMap[category];

  const { data } = useQuery(GET_AUTH_USER);
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
  });

  const [updateTransaction, { loading: loadingUpdate }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
    }
  );

  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  description = description[0]?.toUpperCase() + description.slice(1);
  const Category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);
  const formatedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: transaction._id },
      });
    } catch (error) {
      console.error("Error Fetching Transaction", error);
      toast.error(error.message);
    }
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = parseFloat(formData.amount);
    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount: amountNum,
            transactionId: transaction._id,
          },
        },
      });
      toast.success("Transaction Updated Successfully");
      setIsModalOpen(false); 
    } catch (error) {
      console.error("error updating transaction:", error);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || "",
        paymentType: transaction.paymentType || "",
        category: transaction.category || "",
        amount: transaction.amount || "",
        location: transaction.location || "",
        date: transaction.date
          ? new Date(+transaction.date).toISOString().substr(0, 10)
          : "",
      });
    }
  }, [transaction]);

  return (
    <div className="group border-[1px] border-zinc-100 w-full overflow-y-auto bg-zinc-50 hover:bg-zinc-100">
      <div className="flex justify-between px-6 py-5">
        <div className="flex flex-col">
          <h2 className="font-medium text-xl tracking-wide">{description}</h2>
          <div className="flex flex-wrap items-center mt-1 gap-2">
            <span className="text-[13px] text-gray-600">{formatedDate}</span>
            <span
              className={`text-[12px] bg-blue-100 px-2 py-0.5 rounded-full ${
                category === "expense"
                  ? "bg-red-100"
                  : category === "saving"
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              {category}
            </span>
            {/* <span className="text-[12px] bg-blue-100 px-2 py-0.5 rounded-full">
              {Category}
            </span> */}
            <div className="flex items-center text-[13px] text-gray-600">
              {paymentType}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            {!loading ? (
              <FaTrash
                className="cursor-pointer text-zinc-500 hover:text-red-500"
                size={13}
                onClick={handleDelete}
              />
            ) : (
              <div className="w-6 h-6 border-t-2 border-white border-b-2 rounded-full animate-spin"></div>
            )}

            <HiPencilAlt
              className="cursor-pointer text-zinc-500 hover:text-blue-500"
              size={16}
              onClick={handleUpdateClick} 
            />
          </div>
          <h2
            className={`text-[21px] font-medium  ${
              category === "expense"
                ? "text-red-600"
                : category === "saving"
                ? "text-green-600"
                : "text-blue-500"
            }`}
          >
            ${amount}
          </h2>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200/60 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <form
              className="w-full flex flex-col gap-5 px-3"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap">
                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="description"
                  >
                    Transaction
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Rent, Groceries, Salary, etc."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="w-full flex-1 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="paymentType"
                  >
                    Payment Type
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="paymentType"
                      name="paymentType"
                      onChange={handleInputChange}
                      value={formData.paymentType}
                    >
                      <option value={"card"}>Card</option>
                      <option value={"cash"}>Cash</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-full flex-1 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="category"
                      name="category"
                      onChange={handleInputChange}
                      value={formData.category}
                    >
                      <option value={"saving"}>Saving</option>
                      <option value={"expense"}>Expense</option>
                      <option value={"investment"}>Investment</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="w-full flex-1 mb-6 md:mb-0">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="amount"
                  >
                    Amount($)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="150"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="w-full flex-1 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="location"
                    name="location"
                    type="text"
                    placeholder="New York"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="w-full flex-1">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    placeholder="Select date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 disabled:opacity-70 disabled:cursor-not-allowed"
                type="submit"
                disabled={loadingUpdate}
              >
                {loadingUpdate ? "Updating..." : "Update Transaction"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
