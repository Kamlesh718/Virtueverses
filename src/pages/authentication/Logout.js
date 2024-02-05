import { LogOutCircle } from "styled-icons/boxicons-regular";

import { BarLoader } from "react-spinners";
import { useLogout } from "./hooks/useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <button onClick={logout} disabled={isLoading}>
      {!isLoading ? <LogOutCircle size="25" /> : <BarLoader />}
    </button>
  );
}

export default Logout;
