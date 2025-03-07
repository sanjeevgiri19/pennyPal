import React, { useState } from "react";
import Navbar from "../components/things/Navbar";
import DropdownMenu from "../components/ui/Dropdown";
import Footer from "../components/things/Footer";
import { useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_TRANSACTIONs } from "../graphql/queries/transaction.query";
import Card from "../components/Card";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const Transactions = () => {
  // const [selectedType, setSelectedType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useQuery(GET_TRANSACTIONs, {
    refetchQueries : ["transactions"]
  });
  // console.log("data", data);

  // Maybe future ma categories rw transaction types lai extend garchu

  // const type = [
  //   { label: "All" },
  //   { label: "Expense" },
  //   { label: "Saving" },
  //   { label: "Investment" },
  // ];

  // const paymentType = [
  //   { label: "Cash" },
  //   { label: "Credit Card" },
  //   { label: "Debit Card" },
  //   { label: "Direct Deposit" },
  //   { label: "Bank Transfer" },
  //   { label: "Wallet Transfer" },
  // ];

  const paymentType = [{ label: "All" }, { label: "Cash" }, { label: "Card" }];

  // const category = [
  //   { label: "Groceries" },
  //   { label: "Income" },
  //   { label: "Dining" },
  //   { label: "Shopping" },
  //   { label: "Utilities" },
  //   { label: "Transportation" },
  // ];

  const category = [
    { label: "All" },
    { label: "Saving" },
    { label: "Expense" },
    { label: "Investment" },
  ];

  const handleToggle = (dropdownName) => (isOpen) => {
    setOpenDropdown(isOpen ? dropdownName : null);
  };

  // Filter transactions based on search query and dropdown selections
  const filteredTransactions =
    data?.transactions?.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // const matchesType =
      //   selectedType && selectedType !== "All"
      //     ? transaction.type.toLowerCase() === selectedType.toLowerCase()
      //     : true;

      const matchesPayment =
        selectedPaymentType && selectedPaymentType !== "All"
          ? transaction.paymentType.toLowerCase() ===
            selectedPaymentType.toLowerCase()
          : true;
      const matchesCategory =
        selectedCategory && selectedCategory !== "All"
          ? transaction.category.toLowerCase() ===
            selectedCategory.toLowerCase()
          : true;

      // return matchesSearch && matchesType && matchesPayment && matchesCategory;
      return matchesSearch && matchesPayment && matchesCategory;
    }) || [];

  const TransactionModal = () => {
    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
      refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
    });

    const handleSubmit = async (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const transactionData = {
        description: formData.get("description"),
        paymentType: formData.get("paymentType"),
        category: formData.get("category"),
        // type: formData.get("type"),
        amount: parseFloat(formData.get("amount")),
        location: formData.get("location"),
        date: formData.get("date"),
      };
      // console.log("transactionData", transactionData);

      try {
        const { data } = await createTransaction({
          variables: { input: transactionData },
        });
        // console.log("logging create transaction data:", data);
        form.reset();
        toast.success("transaction created successfully");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating transaction ", error);
        toast.error(error.message);
      }
    };

    return (
      <>
        <title>PennyPal | Transactions</title>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-200/70 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
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
                      required
                      placeholder="Rent, Groceries, Salary, etc."
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {/* Types */}
                  {/* <div className="w-full flex-1 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="type"
                    >
                      Type
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="type"
                        name="type"
                        required
                      >
                        <option value="expense">Expense</option>
                        <option value="saving">Saving</option>
                        <option value="investment">Investment</option>
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
                  </div> */}

                  <div className="w-full flex-1 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="paymentType"
                    >
                      Payment Type
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none cursor-pointer w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="paymentType"
                        name="paymentType"
                      >
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
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
                      >
                        <option value="saving">Saving</option>
                        <option value="expense">Expense</option>
                        <option value="investment">Investment</option>
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
                      required
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
                      required
                    />
                  </div>
                </div>
                <button
                  className="text-white font-bold w-full cursor-pointer rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "loading.." : "Add Transaction"}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navbar />
      <div className="flex justify-between px-16 py-10">
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] cursor-pointer bg-blue-600 font-semibold text-zinc-100 px-2 py-1 rounded-xl"
        >
          <span className="text-xl">+</span> Add Transaction
        </button>
      </div>

      <div className="w-[91%] mx-auto mb-16 h-[90vh] border-2 overflow-y-auto border-zinc-100 bg-zinc-50 rounded-lg p-6">
        <h1 className="text-xl font-medium mb-6">Transactions</h1>

        <div className="lg:flex md:flex-wrap w-full sm:flex-wrap justify-between">
          <div className="flex items-center lg:w-[70%] md:w-[85%] sm:w-[90%] mb-6">
            <i className="ri-search-line text-gray-500 mr-2"></i>
            <input
              className="px-3 py-2 w-full outline-none border-[1px] border-zinc-600 rounded-md"
              type="text"
              placeholder="Search Transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-4 mb-6">

            {/* <DropdownMenu
              title="Type"
              items={type}
              onSelect={(item) => setSelectedType(item.label)}
              isOpen={openDropdown === "type"}
              onToggle={handleToggle("type")}
            /> */}

            <DropdownMenu
              title="Payment"
              items={paymentType}
              onSelect={(item) => setSelectedPaymentType(item.label)}
              isOpen={openDropdown === "paymentType"}
              onToggle={handleToggle("paymentType")}
            />
            <DropdownMenu
              title="Category"
              items={category}
              onSelect={(item) => setSelectedCategory(item.label)}
              isOpen={openDropdown === "category"}
              onToggle={handleToggle("category")}
            />
          </div>
        </div>

        {loading ? (
          <div>Loading transactions...</div>
        ) : error ? (
          <div>Error loading transactions: {error.message}</div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction._id} transaction={transaction} />
            ))}
            {filteredTransactions.length === 0 && (
              <p className="text-gray-500">No transactions found</p>
            )}
          </div>
        )}
      </div>

      {/* Render the TransactionModal */}
      <TransactionModal />

      <Footer />
    </div>
  );
};

export default Transactions;
