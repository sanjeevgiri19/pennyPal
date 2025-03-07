import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RadioButton from "../components/things/RadioButtons";
import InputField from "../components/things/InputField";
import { BackgroundBeams } from "../components/ui/Background-beams";
import { useMutation } from "@apollo/client";
import {SIGN_UP} from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const  navigate = useNavigate()
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    // refetchQueries: [{ query: SIGN_UP }], // Refresh the users list after adding
    refetchQueries: ["GetAuthUsers"],
  });

  // const history = useHistory(); // For redirection after successful signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (
      !signUpData.name ||
      !signUpData.username ||
      !signUpData.password ||
      !signUpData.gender
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const { data } = await signup({
        variables: {
          input: signUpData,
        },
      });
      // console.log("datata", data);
      
      if (data) {
        toast.success("Sign up successful!");
        navigate("/");
        // history.push("/login"); // Redirect user to the login page after successful signup
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred during signup");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="h-screen flex justify-center bg-black items-center">
      <title>PennyPal | Signup</title>
      <div className="flex rounded-lg overflow-hidden z-50 bg-transparent">
        <div className="w-full min-w-80 sm:min-w-96 border border-zinc-400 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold flex justify-center mb-4 text-zinc-200 text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-300/80 text-center">
              Join to keep track of your expenses
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={signUpData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Username"
                id="username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
                required
              />
              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={signUpData.password}
                onChange={handleChange}
                required
              />
              <div className="flex gap-10">
                <RadioButton
                  id="male"
                  label="Male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-zinc-800/70 text-white p-2 cursor-pointer rounded-md hover:bg-gray-700/80 focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>

            {/* can be removed from here, natra form ma error dekhau na sakcha */}
            {error && (
              <div className="mt-4 text-red-500 text-center">
                <p>{error.message}</p>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-400 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400/80 hover:underline">
                  Login here
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

export default SignUpPage;
