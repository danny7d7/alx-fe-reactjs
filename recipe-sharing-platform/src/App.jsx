import { useState } from "react";
import HomePage from "./conponents/HomePage.jsx";
import AddRecipeForm from "./conponents/AddRecipeForm.jsx";
import initialData from "./data.json";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("userRecipes") || "[]"
    );
    return [...initialData, ...savedRecipes];
  });

  const handleAddRecipe = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleRecipeSubmit = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now(),
      image:
        newRecipe.image ||
        `https://picsum.photos/seed/${Date.now()}/400/400.jpg`,
    };

    const updatedRecipes = [...recipes, recipeWithId];
    setRecipes(updatedRecipes);

    // Save only user-added recipes to localStorage
    const userRecipes = updatedRecipes.filter(
      (r) => !initialData.some((d) => d.id === r.id)
    );
    localStorage.setItem("userRecipes", JSON.stringify(userRecipes));

    setShowForm(false);
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter((r) => r.id !== id);
    setRecipes(updatedRecipes);

    // Save only user-added recipes to localStorage
    const userRecipes = updatedRecipes.filter(
      (r) => !initialData.some((d) => d.id === r.id)
    );
    localStorage.setItem("userRecipes", JSON.stringify(userRecipes));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-700 to-amber-200">
      <HomePage recipes={recipes} onDelete={handleDeleteRecipe} />
      {!showForm && (
        <div className="flex justify-center pb-8">
          <button
            onClick={handleAddRecipe}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold"
          >
            Add Recipe
          </button>
        </div>
      )}
      {showForm && (
        <AddRecipeForm
          onClose={handleCloseForm}
          onSubmit={handleRecipeSubmit}
        />
      )}

      <h1 className="backdrop-blur-lg bg-white/30 p-4 rounded-lg text-2xl font-bold text-emerald-900 absolute top-4 left-4">
        hey
      </h1>
    </div>
  );
}

export default App;
