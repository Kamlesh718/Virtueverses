import { useState } from "react";
import { blogs } from "../../blogsTempData";
import { Link, Outlet, useNavigate } from "react-router-dom";

function ManageCategory() {
  const posts = blogs;

  const [editMode, setEditMode] = useState(false);
  const handleEditMode = function () {
    setEditMode(true);
  };

  const navigate = useNavigate();

  const handleBack = function () {
    navigate("/dashboard/managecategory");
    setEditMode(false);
  };
  return (
    <div className="p-6  rounded-md  ">
      <h1 className="text-xl sm:text-2xl  font-bold text-violet-200 mb-4 sticky">
        {editMode ? "Edit Category" : "Manage Category"}
      </h1>
      {editMode || (
        <ul className="list-none  ">
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <div className="bg-violet-400 p-4 rounded-md flex justify-between">
                <h2 className="text-md sm:text-lg font-semibold text-violet-950 mb-2 ">
                  {post.id}
                </h2>
                <div className="flex gap-2 ">
                  <Link
                    onClick={handleEditMode}
                    to={`editcategory/${post.id}`}
                    className="px-3 sm:px-5 py-2 bg-violet-950 text-violet-200 rounded-md hover:bg-violet-800 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Edit
                  </Link>
                  <button className="px-2 sm:px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:border-blue-300">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editMode && (
        <>
          <button
            type="submit"
            className="bg-violet-950 text-violet-200 py-2 px-4 rounded-full hover:text-violet-950 hover:bg-violet-400 focus:outline-none focus:bg-violet-700"
            onClick={handleBack}
          >
            Back
          </button>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default ManageCategory;
