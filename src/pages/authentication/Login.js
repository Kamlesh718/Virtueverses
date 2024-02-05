import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import TempMail from "../../ui/TempMail";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };
  return (
    <>
      <div className=" bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 flex justify-center items-center  h-screen overflow-hidden">
        <div className=" w-full sm:w-[96vh] h-[50vh] p-16">
          <span className="font-bold text-violet-950 text-3xl flex justify-left py-4">
            Login
          </span>
          <form className=" flex flex-col gap-2 " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              className="rounded-lg p-2 text-violet-950 caret-violet-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-lg p-2  text-violet-950 caret-violet-950 w-[30vh] sm:w-[61vh]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
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
            <input
              type="submit"
              value={!isLoading ? "Login" : "Loading"}
              className="rounded-lg bg-violet-950 p-2 text-violet-300 hover:bg-violet-900 hover:text-violet-200 transition-colors"
              disabled={isLoading}
            />
          </form>
          <span className="font-bold text-violet-950 text-sm flex justify-left py-4">
            Didn't have a account ?
            {
              <Link to="/register" className="px-2 underline">
                Register Here!!
              </Link>
            }
          </span>
          <TempMail />
        </div>
      </div>
    </>
  );
}

export default Login;
