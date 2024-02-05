import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Blog } from "styled-icons/icomoon";
import { Info } from "styled-icons/octicons";
import { LogInCircle } from "styled-icons/boxicons-regular";
import { SpeakerNotes } from "styled-icons/material";
import { DashboardCustomize } from "styled-icons/material-outlined";
import Logout from "../pages/authentication/Logout";
import { useUser } from "../pages/authentication/hooks/useUser";
import UserFullName from "./UserFullName";
import ProfileImage from "./ProfileImage";
import { useUserData } from "./useUserData";
import { BarLoader } from "react-spinners";

const BlogLogo = styled(Blog)`
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
  }
`;
const SpeakerNotesLogo = styled(SpeakerNotes)`
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
  }
`;
const InfoLogo = styled(Info)`
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
  }
`;
const LogInCircleLogo = styled(LogInCircle)`
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
  }
`;
const DashboardLogo = styled(DashboardCustomize)`
  &:hover {
    transform: scale(1.2);
    transition: 0.4s;
  }
`;

function Navbar() {
  const { isLoading, fullName, profileImage } = useUserData();

  return (
    <div>
      <nav className="grid grid-cols-2 items-center bg-violet-700 p-4 font-medium sticky w-full ">
        <Link to="/">
          <span className="text-violet-200 hover:text-violet-100">
            {<BlogLogo size="25" />}
          </span>
        </Link>

        <div className="li-none flex gap-8 justify-end items-center">
          <NavLink to="/blogs">
            <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
              Blogs
            </span>
            <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
              {<SpeakerNotesLogo size="25" />}
            </span>
          </NavLink>
          <NavLink to="/about">
            <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100">
              About
            </span>
            <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
              {<InfoLogo size="25" />}
            </span>
          </NavLink>
          <NavLink to="/dashboard">
            <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100">
              Dashboard
            </span>
            <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
              {<DashboardLogo size="25" />}
            </span>
          </NavLink>
          {isLoading ? <BarLoader /> : <UserFullName fullName={fullName} />}
          {isLoading ? (
            <BarLoader size="20" />
          ) : (
            <ProfileImage profileImageUrl={profileImage} altText={fullName} />
          )}{" "}
          <Link>
            <span className=" hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100">
              <Logout />
            </span>
          </Link>
          {/* <NavLink to="/login">
            <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100">
              Login
            </span>

            <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
              {<LogInCircleLogo size="25" />}
            </span>
          </NavLink> */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
