import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const RecommendationsList = () => {
  const navigate = useNavigate();
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );
  const recipes = useRecipeStore((state) => state.recipes);

  // Generate recommendations when the component mounts
  useEffect(() => {
    if (recommendations.length === 0 && recipes.length > 0) {
      generateRecommendations();
    }
  }, [generateRecommendations, recommendations.length, recipes.length]);

  if (recommendations.length === 0) {
    return null; // Don't render anything if no recommendations
  }

  return (
    <div style={{ margin: "40px 0" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Recommended For You
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {recommendations.slice(0, 3).map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ":hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          >
            {recipe.imageUrl ? (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderBottom: "1px solid #e0e0e0",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "14px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                No Image
              </div>
            )}
            <div style={{ padding: "15px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#333",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {recipe.title}
              </h3>
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  fontSize: "14px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {recipe.description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
