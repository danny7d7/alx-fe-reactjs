import useRecipeStore from "./RecipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (recipes.length === 0) {
    return <div>No recipes yet. Add one below!</div>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
