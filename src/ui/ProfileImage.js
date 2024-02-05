import React from "react";

const ProfileImage = ({ profileImageUrl, altText = "Profile Image" }) => {
  return (
    <img
      src={profileImageUrl}
      alt={altText}
      className="w-11 h-11  rounded-full  object-cover"
    />
  );
};

export default ProfileImage;
