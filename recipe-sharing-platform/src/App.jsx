import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./conponents/HomePage.jsx";
import AddRecipeForm from "./conponents/AddRecipeForm.jsx";
import RecipeDetail from "./conponents/RecipeDetail.jsx";
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
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-700 to-amber-200">
        <Routes>
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetail recipes={recipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
