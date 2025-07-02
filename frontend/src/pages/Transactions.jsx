import React, { useState } from "react";
import Navbar from "../components/things/Navbar";
import DropdownMenu from "../components/ui/Dropdown";
import Footer from "../components/things/Footer";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONs } from "../graphql/queries/transaction.query";
import Card from "../components/Cards/Card";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import TransactionModal from "./TransactionModal";

const Transactions = () => {
  // const [selectedType, setSelectedType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useQuery(GET_TRANSACTIONs, {
    refetchQueries: ["transactions"],
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

      return matchesSearch && matchesPayment && matchesCategory;
    }) || [];

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

      <TransactionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <Footer />
    </div>
  );
};

export default Transactions;
