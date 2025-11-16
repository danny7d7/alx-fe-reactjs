import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Pasta Carbonara",
      description:
        "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    },
    {
      id: 2,
      title: "Chicken Curry",
      description:
        "Spicy and flavorful curry made with chicken and aromatic spices.",
    },
  ],
  favorites: [],
  searchTerm: "",
  filteredRecipes: [],
  recommendations: [],

  // Recipe actions
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }],
    })),

  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  // Favorites actions
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Search and filter
  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: (term) =>
    set((state) => {
      const searchTerm = term.toLowerCase();
      return {
        filteredRecipes: state.recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm)
        ),
      };
    }),

  // Recommendations
  generateRecommendations: () =>
    set((state) => {
      // Simple recommendation based on favorites
      const recommended = state.recipes
        .filter(
          (recipe) =>
            !state.favorites.includes(recipe.id) && Math.random() > 0.5
        )
        .slice(0, 3);

      return { recommendations: recommended };
    }),
}));

export default useRecipeStore;
