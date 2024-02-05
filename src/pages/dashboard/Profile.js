import React, { useState } from "react";
import { useUserData } from "../../ui/useUserData";
import { useUpdateUser } from "../authentication/hooks/useUpdateUser";
import { LoaderIcon } from "react-hot-toast";
import { Important } from "styled-icons/fluentui-system-filled";

const Profile = () => {
  const { fullName, email, userId } = useUserData();
  const [fullNameUpdate, setFullNameUpdate] = useState(fullName);
  const [emailUpdate, setEmailUpdate] = useState(email);
  const [password, setPassword] = useState("");
  const [profileImageUpdate, setProfileImageUpdate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { isUpdating, updateUser } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userId,
      fullName: fullNameUpdate,
      profileImage: profileImageUpdate,
    };

    if (fullName || profileImageUpdate) updateUser(formData);
    if (password) updateUser({ password });

    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto h-min p-6">
      <h2 className="text-2xl text-violet-200 font-semibold mb-6">
        Profile Management
      </h2>

      <div className="mb-3">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          disabled={true}
          value={emailUpdate}
          onChange={(e) => setEmailUpdate(e.target.value)}
          className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring focus:border-violet-200 cursor-not-allowed text-violet-200"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="fullName"
            value={fullNameUpdate}
            onChange={(e) => setFullNameUpdate(e.target.value)}
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring focus:border-violet-200"
          />
        </div>

        <div className="mb-3">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password(8-chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring focus:border-violet-200"
            />
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-violet-950"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="profileImage"
            className="block text-violet-200 text-lg font-medium mb-3"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={(e) => setProfileImageUpdate(e.target.files[0])}
            className="block w-full text-sm text-violet-200
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 font-semibold
      "
          />
          <p className="text-red-100 bg-red-600 mt-2 font-semibold rounded-md p-3">
            {<Important size="25" />}To also update your name in your existing
            posts reupload your profile image {<Important size="25" />}
          </p>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-violet-950 text-violet-200 py-2 px-4 rounded-full  hover:text-violet-950 hover:bg-violet-400 focus:outline-none focus:bg-violet-700"
        >
          {isUpdating ? <LoaderIcon /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
