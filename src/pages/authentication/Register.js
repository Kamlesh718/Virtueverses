import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "./useRegister";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = function ({ username, email, password }) {
    // e.preventDefault();
    register(
      {
        username,
        email,
        password,
      },
      {
        onSuccess: navigate("/login"),
      }
    );
  };

  return (
    <div className=" bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 flex justify-center items-center h-screen overflow-hidden ">
      <div className=" w-[80vh] h-[50vh] px-16">
        <span className="font-bold text-violet-950 text-3xl flex justify-left py-4">
          Register
        </span>
        <form className=" flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="rounded-lg p-2 text-violet-950 caret-violet-950"
            disabled={isLoading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="rounded-lg p-2 text-violet-950 caret-violet-950"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              className="rounded-lg p-2  text-violet-950 caret-violet-950 w-[61vh]"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-violet-950"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              className="block w-full text-sm text-violet-950
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
              disabled={isLoading}
            />
          </label>
          <input
            type="submit"
            value="Register"
            className="rounded-lg bg-violet-950 p-2 text-violet-300 hover:bg-violet-900 hover:text-violet-200 transition-colors"
            disabled={isLoading}
          />
        </form>
        <span className="font-bold text-violet-950 text-sm flex justify-left py-4">
          Already have a account ?
          {
            <Link to="/login" className="px-2 underline">
              Login Here!!
            </Link>
          }
        </span>
      </div>
    </div>
  );
}

export default Register;
