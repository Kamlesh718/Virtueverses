import supabase from "./supabase";

export async function getCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Error fetching categories");
  }

  return categories;
}

export async function insertCategories({ title, description }) {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ title: title, description: description }]);

  if (error) {
    console.error(error);
    throw new Error("Error fetching categories");
  }

  return data;
}
