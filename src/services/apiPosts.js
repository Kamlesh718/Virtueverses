import supabase, { supabaseUrl } from "./supabase";

export async function getPosts() {
  const { data: posts, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }

  return posts;
}

// export async function updateLikes({ post_id, user_id, liked }) {
//   const { data, error } = await supabase
//     .from("likes")
//     .upsert([{ post_id, user_id, liked }])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Error fetching Posts");
//   }

//   return data;
// }

export async function updateLikes({ post_id, user_id, liked }) {
  // Check the current state of likes for the specified post_id and user_id
  const { data: existingLikes, error: fetchError } = await supabase
    .from("likes")
    .select("id, liked")
    .eq("post_id", post_id)
    .eq("user_id", user_id);

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Error fetching likes");
  }

  if (existingLikes.length > 0) {
    // If a like record exists, update it
    const { data: updatedLikes, error: updateError } = await supabase
      .from("likes")
      .upsert([
        {
          id: existingLikes[0].id,
          post_id,
          user_id,
          liked,
        },
      ])
      .select();

    if (updateError) {
      console.error(updateError);
      throw new Error("Error updating likes");
    }

    return updatedLikes;
  } else {
    // If no like record exists, insert a new one
    const { data: newLikes, error: insertError } = await supabase
      .from("likes")
      .upsert([{ post_id, user_id, liked }])
      .select();

    if (insertError) {
      console.error(insertError);
      throw new Error("Error inserting likes");
    }

    return newLikes;
  }
}

export async function getLikes({ userId, postId }) {
  if (!userId) return;
  const { data: currentUserLikes, error } = await supabase
    .from("likes")
    .select("liked")
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return currentUserLikes;
}

export async function updatePostLikes({ postId, likeCount }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ likes_count: likeCount })
    .eq("id", postId);

  if (error) {
    console.error(error);
    throw new Error("Error fetching Posts");
  }

  return data;
}

export async function addPosts({
  title,
  description,
  image,
  user_profile_image,
  author,
  userId,
}) {
  if (!image || !title || !description) {
    throw new Error("All the fields are required to create a post ");
  }
  const hasImagePath = image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/post-image/${imageName}`;

  // 1.Create Post
  let query = supabase.from("posts");

  // A)Create
  query = query.insert([
    {
      title,
      description,
      image: imagePath,
      user_profile_image,
      author,
      userId,
    },
  ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Post could not be created!!");
  }

  // 2.Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("post-image")
    .upload(imageName, image);

  // 3.Delete the post if there is an error uploading an image
  if (storageError) {
    await supabase.from("posts").delete().eq(data.id);

    console.error(storageError);
    throw new Error(
      "Post image could not be uploaded,and the post was not created"
    );
  }

  return data;
}

export async function updatePost({
  id,
  title,
  description,
  image,
  prevImagePath,
  author,
  profileImage,
}) {
  if (!image || !title || !description) {
    throw new Error("All the fields are required to create a post ");
  }
  const hasImagePath = image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/post-image/${imageName}`;

  // Deleting previous post
  if (prevImagePath) {
    const prevImageName = prevImagePath.split("/").pop();
    await supabase.storage.from("post-image").remove([prevImageName]);
  }

  let updateData;
  if ((title, description, image))
    updateData = { title, description, image: imagePath };
  if ((author, profileImage))
    updateData = { author, user_profile_image: profileImage };

  const { data, error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  // 2.Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("post-image")
    .upload(imageName, image);

  // 3.Delete the post if there is an error uploading an image
  if (storageError) {
    await supabase.from("posts").delete().eq(data.id);

    console.error(storageError);
    throw new Error(
      "Post image could not be uploaded,and the post was not created"
    );
  }

  return data;
}

export async function getCurrentUserPosts({ userId }) {
  if (!userId) return;
  const { data: currentUserPosts, error } = await supabase
    .from("posts")
    .select("id,title,description,image")
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return currentUserPosts;
}

export async function deletePost({ id, prevImagePath }) {
  const { data: likesdata } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", id);

  const { data: commentsData } = await supabase
    .from("comments")
    .delete()
    .eq("post_id", id);

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .returns("id");

  if (!error && data && data.length > 0) {
    const postId = data[0].id;

    // Use another transaction to delete associated likes
    const { error: likesError } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId);

    if (likesError) {
      console.error("Error deleting likes:", likesError);
      throw new Error(likesError);
    }
  }

  // Deleting previous post
  if (prevImagePath) {
    const prevImageName = prevImagePath.split("/").pop();
    await supabase.storage.from("post-image").remove([prevImageName]);
  }

  if (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function addComments({ post_id, user_id, content, fullName }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id, user_id, content, fullName }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
}

export async function getComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("id,content,fullName,created_at,user_id,post_id");

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
}

export async function deleteComment({ id }) {
  const { error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error);
  }
}
