import { useState } from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("recipes");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Sharing App</h1>
        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab("recipes")}
            className={`tab-button ${activeTab === "recipes" ? "active" : ""}`}
          >
            View Recipes
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          >
            Add New Recipe
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === "recipes" ? (
          <RecipeList />
        ) : (
          <AddRecipeForm onSuccess={() => setActiveTab("recipes")} />
        )}
      </main>
    </div>
  );
}

export default App;
