import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import initialData from "../data.json";

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find recipe in props first, then fallback to initial data
    const foundRecipe =
      recipes.find((r) => r.id === parseInt(id)) ||
      initialData.find((r) => r.id === parseInt(id));

    setRecipe(foundRecipe || null);
    setLoading(false);
  }, [id, recipes]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-white text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Recipe Not Found
          </h1>
          <Link
            to="/"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors inline-block"
          >
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-white hover:text-emerald-200 mb-6 transition-colors"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <h1 className="absolute bottom-6 left-6 text-3xl sm:text-4xl font-bold text-white">
              {recipe.title}
            </h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Ingredients Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                Ingredients
              </h2>
              {recipe.ingredients ? (
                <ul className="space-y-2">
                  {recipe.ingredients
                    .split("\n")
                    .filter((i) => i.trim())
                    .map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span className="text-gray-700">
                          {ingredient.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500">No ingredients listed</p>
              )}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                Preparation Steps
              </h2>
              {recipe.steps || recipe.instructions ? (
                <div className="space-y-4">
                  {(recipe.steps || recipe.instructions)
                    .split("\n")
                    .filter((step) => step.trim())
                    .map((step, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{step.trim()}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No preparation steps listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            About this Recipe
          </h2>
          <p className="text-gray-700 leading-relaxed">{recipe.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
