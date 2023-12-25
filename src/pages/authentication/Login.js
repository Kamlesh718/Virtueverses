import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(username);
  console.log(password);

  const handleSubmit = function (e) {
    e.preventDefault();
  };
  return (
    <div className=" bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 flex justify-center items-center h-screen overflow-hidden">
      <div className=" w-[80vh] h-[50vh] p-16">
        <span className="font-bold text-violet-950 text-3xl flex justify-left py-4">
          Login
        </span>
        <form className=" flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="rounded-lg p-2 text-violet-950 caret-violet-950"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="rounded-lg p-2  text-violet-950 caret-violet-950 w-[61vh]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-violet-950"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            type="submit"
            value="Login"
            className="rounded-lg bg-violet-950 p-2 text-violet-300 hover:bg-violet-900 hover:text-violet-200 transition-colors"
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
      </div>
    </div>
  );
}

export default Login;
