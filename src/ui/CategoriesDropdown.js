import { useFetchCategories } from "../pages/dashboard/hooks/useFetchCategories";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

function CategoriesDropdown({ onSelect }) {
  const { isLoading, error, categories } = useFetchCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  if (error) {
    console.error("Error fetching categories:", error);
    return <p>Error fetching categories</p>;
  }

  if (isLoading) {
    return <BeatLoader />;
  }

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    // Call the onSelect callback with the selected category ID
    if (onSelect) {
      onSelect(categoryId);
    }
  };

  return (
    <>
      <label htmlFor="category" className="mb-1 font-semibold">
        Category
      </label>
      <select
        id="category"
        name="category"
        className="text-violet-950"
        value={selectedCategoryId}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategoriesDropdown;
