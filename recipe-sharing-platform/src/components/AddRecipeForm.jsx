import { useState } from "react";

function AddRecipeForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Recipe name is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Summary is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      const ingredientList = formData.ingredients
        .split("\n")
        .filter((i) => i.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please include at least 2 ingredients";
      }
    }

    if (!formData.steps.trim()) {
      newErrors.steps = "Preparation steps are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">
            Add New Recipe
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Recipe Name *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe name"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Summary *
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Describe your recipe..."
              rows={3}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                errors.summary
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-500">{errors.summary}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Ingredients * (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup sugar"
              rows={4}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                errors.ingredients
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {errors.ingredients && (
              <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="steps"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Preparation Steps * (numbered list)
            </label>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients and mix well"
              rows={5}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                errors.steps
                  ? "border-red-500"
                  : "border-gray-300 focus:border-emerald-500"
              }`}
            />
            {errors.steps && (
              <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Image URL (optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/recipe-image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
