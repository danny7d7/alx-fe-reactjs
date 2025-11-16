import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");

  // Reset form when recipe changes
  useEffect(() => {
    if (!recipe) return;

    const resetForm = () => ({
      title: recipe.title || "",
      description: recipe.description || "",
      ingredients: recipe.ingredients ? recipe.ingredients.join("\n") : "",
      instructions: recipe.instructions ? recipe.instructions.join("\n") : "",
      imageUrl: recipe.imageUrl || "",
    });

    // Use a timeout to defer the state update to avoid the warning
    const timer = setTimeout(() => {
      setFormData(resetForm());
    }, 0);

    return () => clearTimeout(timer);
  }, [recipe]); // Depend on the entire recipe object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    const updatedRecipe = {
      ...formData,
      ingredients: formData.ingredients
        .split("\n")
        .map((ing) => ing.trim())
        .filter((ing) => ing.length > 0),
      instructions: formData.instructions
        .split("\n")
        .map((step) => step.trim())
        .filter((step) => step.length > 0),
    };

    updateRecipe(recipeId, updatedRecipe);
    navigate(`/recipe/${recipeId}`);
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Edit Recipe</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="5"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
              fontFamily: "monospace",
            }}
            placeholder="1 cup flour\n2 eggs\n1/2 cup sugar"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Instructions (one step per line)
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="8"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              resize: "vertical",
              fontFamily: "monospace",
            }}
            placeholder="Preheat oven to 350°F...\nMix dry ingredients..."
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
