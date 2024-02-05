import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./hooks/useSignup";
import { BarLoader } from "react-spinners";

function Register() {
  const { signup, isLoading } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    const formData = {
      fullName,
      email,
      password,
      profileImage,
    };
    signup(formData, {
      onSettled: () => {
        navigate("/login");
        setFullName("");
        setPassword("");
        setEmail("");
        setProfileImage(null);
      },
      onError: () => {
        navigate("/register");
      },
    });
  };

  return (
    <div className=" bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 flex justify-center items-center h-screen overflow-hidden ">
      <div className=" w-full sm:w-[96vh] h-[50vh] p-16">
        <span className="font-bold text-violet-950 text-3xl flex justify-left py-4">
          Register
        </span>
        <form className=" flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="fullName"
            id="fullName"
            className="rounded-lg p-2 text-violet-950 caret-violet-950"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="rounded-lg p-2 text-violet-950 caret-violet-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (8-chars)"
              id="password"
              className="rounded-lg p-2  text-violet-950 caret-violet-950 w-[30vh] sm:w-[61vh]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-violet-950"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              required
              className="block w-full text-sm text-violet-950
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
          </label>
          <input
            type="submit"
            value={isLoading ? <BarLoader size={20} /> : "Register"}
            className="rounded-lg bg-violet-950 p-2 text-violet-300 hover:bg-violet-900 hover:text-violet-200 transition-colors"
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
