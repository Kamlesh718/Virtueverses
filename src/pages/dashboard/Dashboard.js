import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Plus } from "styled-icons/bootstrap";
import { CategoryAlt } from "styled-icons/boxicons-solid";
import { Close } from "styled-icons/evil";
import { Menu } from "styled-icons/ionicons-outline";
import { ManageAccounts, PostAdd } from "styled-icons/material";
import { Bloglovin } from "styled-icons/simple-icons";
import EditUsers from "./EditUsers";

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) setMenuOpen(!menuOpen);
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <button
        className="lg:hidden text-white focus:outline-none fixed px-1"
        onClick={toggleMenu}
      >
        {menuOpen ? (
          <Close size="40" className="text-violet-950 mx-2" />
        ) : (
          <Menu size="40" className="text-violet-950 mx-2" />
        )}
      </button>
      <div className="flex px-1 sm:px-20 py-8 w-screen gap-2 sm:gap-4 h-full">
        <div
          className={`w-1/10 ${
            menuOpen ? "block" : "hidden"
          } lg:flex items-center`}
        >
          <aside className=" flex flex-col gap-1 w-full sticky">
            <Link
              to="addpost"
              className="p-5 font-semibold rounded-sm bg-violet-950 text-violet-200"
            >
              <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
                Add Post
              </span>
              <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
                {<PostAdd size="25" />}
              </span>
            </Link>
            <Link
              to="managepost"
              className="p-5 font-semibold rounded-sm bg-violet-950 text-violet-200"
            >
              <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
                Manage Post
              </span>
              <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
                {<Bloglovin size="25" />}
              </span>
            </Link>

            <Link
              to="manageuser"
              className="p-5 font-semibold rounded-sm bg-violet-950 text-violet-200"
            >
              <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
                Manage Users
              </span>
              <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
                {<ManageAccounts size="25" />}
              </span>
            </Link>
            <Link
              to="addcategory"
              className="p-5 font-semibold rounded-sm bg-violet-950 text-violet-200"
            >
              <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
                Add Category
              </span>
              <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
                {<Plus size="25" />}
              </span>
            </Link>
            <Link
              to="managecategory"
              className="p-5 font-semibold rounded-sm bg-violet-950 text-violet-200"
            >
              <span className="max-sm:hidden hover:font-bold transition-all drop-shadow-md hover:drop-shadow-xl text-violet-200 hover:text-violet-100 ">
                ManageCategory
              </span>
              <span className="sm:hidden md:hidden text-violet-200 hover:text-violet-100">
                {<CategoryAlt size="25" />}
              </span>
            </Link>
          </aside>
        </div>

        <div className="w-full bg-violet-900 p-8 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
