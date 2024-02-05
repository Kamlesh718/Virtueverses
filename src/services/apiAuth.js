import toast from "react-hot-toast";
import supabase, { supabaseUrl } from "./supabase";
import { updatePost } from "./apiPosts";

export async function signup({ fullName, email, password, profileImage }) {
  // Sign up the user with email and password
  const profileImageName = `${Math.random()}-${profileImage.name}`;
  const { data: user, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        profile_image_url: `${supabaseUrl}/storage/v1/object/public/profile-image/${profileImageName}`,
      },
    },
  });
  const userId = user.id;

  const { error: uploadError } = await supabase.storage
    .from("profile-image")
    .upload(profileImageName, profileImage);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  if (password.length < 8) {
    toast.error(signUpError.message);
  }

  if (signUpError) {
    toast.error(`${signUpError.message}, Register Again`);
    throw new Error(signUpError.message);
  }

  return user;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// async function updatePostsForUser({ userId, fullName, profileImage }) {
//   const { data: userPosts, error } = await supabase
//     .from("posts")
//     .select("id, author, user_profile_image") // Select relevant fields for update
//     .eq("userId", userId);
//   if (error) throw new Error(error.message);

//   const updatePosts = userPosts.map((post) =>
//     updatePost({
//       author: fullName || post.author, // Update author only if changed
//       user_profile_image: profileImage || post.user_profile_image, // Same for image
//     })
//   );

//   await supabase.from("posts").update(updatePosts); // Use direct update for efficiency
// }

export async function updateCurrentUser({
  userId,
  password,
  fullName,
  profileImage,
}) {
  // 1.Update password OR the fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!profileImage) return data;

  // 2.Upload the profileImage image
  const fileName = `${Math.random()}-${profileImage.name}`;

  const { error: storageError } = await supabase.storage
    .from("profile-image")
    .upload(fileName, profileImage);

  if (storageError) throw new Error(error.message);

  // 3.Update profileImage in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      profile_image_url: `${supabaseUrl}/storage/v1/object/public/profile-image/${fileName}`,
    },
  });

  //Updating users post author-name and profile image
  // const updateData2 = {};
  // let updateData2;

  // if (fullName)
  //   updateData2 = {
  //     author: updatedUser.user.user_metadata.fullName,
  //   };
  // if (profileImage)
  //   updateData2 = {
  //     user_profile_image: updatedUser.user.user_metadata.profile_image_url,
  //   };

  if (fullName) {
    const { error: error3 } = await supabase
      .from("posts")
      .update({ author: updatedUser.user.user_metadata.fullName })
      .eq("userId", userId);
    if (error3) throw new Error(error3.message);
  }
  if (fullName || profileImage) {
    const { error: error3 } = await supabase
      .from("posts")
      .update({
        author: updatedUser.user.user_metadata.fullName,
        user_profile_image: updatedUser.user.user_metadata.profile_image_url,
      })
      .eq("userId", userId);
    if (error3) throw new Error(error3.message);
  }

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
