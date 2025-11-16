import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    imageUrl: ""
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
      imageUrl: recipe.imageUrl || ""
    });
    
    // Use a timeout to defer the state update to avoid the warning
    const timer = setTimeout(() => {
      setFormData(resetForm());
    }, 0);
    
    return () => clearTimeout(timer);
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  
  if (!formData.title.trim()) {
    setError("Title is required");
    return;
  }
  
  // Rest of the function...
};
    
    const updatedRecipe = {
      ...formData,
      ingredients: formData.ingredients
        .split("\n")
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0),
      instructions: formData.instructions
        .split("\n")
        .map(step => step.trim())
        .filter(step => step.length > 0)
    };
    
    updateRecipe(recipeId, updatedRecipe);
    navigate(`/recipe/${recipeId}`);
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="form-container">
      <h1 className="text-center mb-4">Edit Recipe</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Ingredients (one per line)
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            rows="5"
            className="form-control"
            placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup sugar"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Instructions (one step per line)
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="8"
            className="form-control"
            placeholder="Preheat oven to 350°F...&#10;Mix dry ingredients..."
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {error && (
          <div className="text-danger mb-3">
            {error}
          </div>
        )}
        
        <div className="d-flex gap-3 mt-4">
          <button type="submit" className="btn">
            Save Changes
          </button>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
