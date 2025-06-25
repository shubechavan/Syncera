import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
  e.preventDefault();

  // Basic client-side validation
  if (!email || !password) {
    setError("Both email and password are required.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  try {
    // Dummy authentication logic
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("token", "dummy-token");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
  }
};

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome back</h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your email and password to login
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="minimum 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
    
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all mt-2"
          >
            Log In
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Dont have an account ?{" " }
            <Link className="font-medium text-primary underline" to="/signup">
            Signup</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
