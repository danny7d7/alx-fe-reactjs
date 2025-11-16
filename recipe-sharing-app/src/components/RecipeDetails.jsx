import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  const isFavorite = useRecipeStore((state) =>
    state.favorites.includes(recipeId)
  );

  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId);
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        &larr; Back to Recipes
      </button>

      <div style={{ display: "flex", gap: "40px", marginBottom: "30px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: "10px" }}>{recipe.title}</h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {recipe.description}
          </p>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button
              onClick={handleToggleFavorite}
              style={{
                padding: "8px 16px",
                backgroundColor: isFavorite ? "#ff4444" : "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            <button
              onClick={() => navigate(`/edit/${recipe.id}`)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit Recipe
            </button>

            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete Recipe
            </button>
          </div>
        </div>

        {recipe.imageUrl && (
          <div style={{ flex: 1 }}>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )) || <li>No ingredients listed</li>}
        </ul>

        <h2 style={{ marginTop: "20px" }}>Instructions</h2>
        <ol>
          {recipe.instructions?.map((step, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {step}
            </li>
          )) || <li>No instructions provided</li>}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
