import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/things/InputField";
import { BackgroundBeams } from "../components/ui/Background-beams";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate =  useNavigate()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthUsers"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(loginData);
    const { username, password } = loginData;
    if (!username || !password) {
      toast.error("All fields are Required");
      return; 
    }
    try {
      const { data } = await login({
        variables: {
          input: loginData,
        },
      });
      if (data?.login) {
        toast.success("Login successful!");
      
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error handling logging", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center bg-black items-center h-screen">
      <title>PennyPal | Login</title>
      <div className="flex rounded-lg overflow-hidden z-50 ">
        <div className="w-full bg-transparent border-2 border-zinc-400 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-zinc-200 text-center">
              Login
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-400 text-center">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full mt-3 bg-zinc-800/70 text-white p-2 cursor-pointer rounded-md hover:bg-gray-700/80 focus:outline-none   transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
									"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4  text-sm text-zinc-400 text-center">
              <p>
                {"Don't"} have an account?{"   "}
                <Link to="/signup" className="text-zinc-200 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};
export default LoginPage;
