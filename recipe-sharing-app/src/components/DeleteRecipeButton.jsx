import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="btn btn-danger"
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
