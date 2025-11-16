import { useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const FavoritesList = () => {
  const navigate = useNavigate();
  const favorites = useRecipeStore((state) => state.favorites);
  const recipes = useRecipeStore((state) => state.recipes);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "40px 0", color: "#666" }}>
        <h2>Your Favorites</h2>
        <p>You haven't added any recipes to your favorites yet.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: "40px 0" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Your Favorite Recipes
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              ":hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderBottom: "1px solid #e0e0e0",
                }}
              />
            )}
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {recipe.title}
              </h3>
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {recipe.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
