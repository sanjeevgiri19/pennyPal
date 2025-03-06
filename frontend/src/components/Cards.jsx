
import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONs } from "../graphql/queries/transaction.query";
import {
  GET_AUTH_USER,
  GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";

const Cards = () => {
  const {
    data,
    loading: loadingTransactions,
    error: errorTransactions,
  } = useQuery(GET_TRANSACTIONs);

  const {
    data: authUser,
    loading: loadingUser,
    error: errorUser,
  } = useQuery(GET_AUTH_USER);

  const {
    data: userAndTransactions,
    loading: loadingUserAndTransactions,
    error: errorUserAndTransactions,
  } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: { userId: authUser?.authUser?._id },
  });

  if (loadingTransactions || loadingUser || loadingUserAndTransactions)
    return <div className="loader">Loading...</div>;
  if (errorTransactions || errorUser || errorUserAndTransactions)
    return (
      <p>
        Error loading data:{" "}
        {errorTransactions?.message ||
          errorUser?.message ||
          errorUserAndTransactions?.message}
      </p>
    );

  return (
    <div className="w-full px-10 z-10 min-h-[40vh]">
      {/* <p className="text-5xl font-bold text-neutral-400 text-center my-10">
        History
      </p> */}
      <div className="">
        {!loadingTransactions &&
          data?.transactions?.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              cardType={transaction.category}
            />
          ))}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loadingTransactions &&
          data?.transactions?.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              cardType={transaction.category}
            />
          ))}
      </div> */}
      
      {!loadingTransactions && data?.transactions?.length === 0 && (
        <p className="text-2xl text-white font-bold text-center w-full">
          No transactions found. Start adding some!
        </p>
      )}
    </div>
  );
};

export default Cards;
