import { useState, useEffect } from "react";
import useRecipeStore from "../store/recipeStore";

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  // Debounce search to avoid too many re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      filterRecipes(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm, filterRecipes]);

  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "10px 15px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "20px",
          outline: "none",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default SearchBar;
