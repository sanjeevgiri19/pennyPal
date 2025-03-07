import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import Login from "./pages/Login";
import TransactionPage from "./pages/Transaction";
import { GET_AUTH_USER } from "./graphql/queries/user.query";
import NotFound from "./pages/NotFound";

import NewUI from "./components/ui/NewUI";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import DashBoard from "./pages/DashBoard";
import Loading from "./components/things/Loading";

const App = () => {
  const { loading, data, error } = useQuery(GET_AUTH_USER);

  // console.log("loading", loading);
  // console.log("error", error);
  // console.log("data", data);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className=" h-screen bg-zinc-50  w-screen">
      {/* {data?.authUser && <Header />} */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/new"
          element={data.authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<NewUI />} />
        <Route
          path="/transactions"
          element={data.authUser ? <Transactions /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={data.authUser ? <DashBoard /> : <Navigate to="/" />}
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signup"
          element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!data.authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;

// todo :
// 1.make a modal for transaction
// 2. update total balance , income and expenses
// 3. pricing , about section
// 4. when clicking on login , take to login form abnd after login, display it as logout in red button,
// 5. display something for auth user and hide something for un-auth user
// 6. delete or commment all console logs
// 8. make it responsive
// 9. update infinite logo courasel
// 7. make more categories, payment type and types as possible changing backend also,
