import React, { useContext, useState } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

const RecipeEdit = ({ recipe }) => {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);
  const [tempChanges, setTempChages] = useState(recipe);

  const handleChange = (changes) => {
    setTempChages({ ...tempChanges, ...changes });
    // handleRecipeChange(recipe.id, { ...recipe, ...changes });
  };
  const handleIngChange = (changes) => {
    // setTempChages({ ...tempChanges, ...changes });

    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  };

  const handleSubmitButton = () => {
    handleRecipeChange(recipe.id, tempChanges);
    handleRecipeSelect(undefined);
  };

  const handleIngredientChange = (id, ingredient) => {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleIngChange({ ingredients: newIngredients });
  };

  const handleIngredientAdd = () => {
    const newIngredient = {
      id: Date.now().toString(),
      name: "",
    };
    handleIngChange({ ingredients: [...recipe.ingredients, newIngredient] });
  };

  const handleIngredientDelete = (id) => {
    handleIngChange({
      ingredients: recipe.ingredients.filter((i) => i.id !== id),
    });
  };

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__modal">
        <div className="recipe-edit__remove-button-container">
          <button
            className="btn recipe-edit__remove-button"
            onClick={() => handleRecipeSelect(undefined)}
          >
            &times;
          </button>
        </div>
        <div className="recipe-edit__details-grid">
          <label htmlFor="name" className="recipe-edit__label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="recipe-edit__input"
            value={tempChanges.name}
            onChange={(e) => handleChange({ name: e.target.value })}
          />
          <label htmlFor="cookTime" className="recipe-edit__label">
            Cook Time
          </label>
          <input
            type="text"
            name="cookTime"
            id="cookTime"
            className="recipe-edit__input"
            value={tempChanges.cookTime}
            onChange={(e) => handleChange({ cookTime: e.target.value })}
          />
          <label htmlFor="servings" className="recipe-edit__label">
            Servings
          </label>
          <input
            type="text"
            name="servings"
            id="servings"
            className="recipe-edit__input"
            value={tempChanges.servings}
            onChange={(e) =>
              handleChange({ servings: parseInt(e.target.value) || "" })
            }
          />
          <label
            htmlFor="instructions"
            id="instructions"
            className="recipe-edit__label"
          >
            Instructions
          </label>
          <textarea
            name="instructions"
            id="instructions"
            className="recipe-edit__input"
            value={tempChanges.instructions}
            onChange={(e) => handleChange({ instructions: e.target.value })}
          />
        </div>
        <br />
        <label className="recipe-edit__label">Ingredients</label>
        <div className="recipe-edit__ingredient-grid">
          <div>Name</div>
          <div>Amount</div>
          <div></div>
          {recipe.ingredients.map((ingredient) => (
            <RecipeIngredientEdit
              key={ingredient.id}
              handleIngredientChange={handleIngredientChange}
              ingredient={ingredient}
              handleIngredientDelete={handleIngredientDelete}
            />
          ))}
        </div>
        <div className="recipe-edit__add-ingredient-btn-container">
          <button className="btn btn--primary" onClick={handleIngredientAdd}>
            Add Ingredient
          </button>
          <button className="btn btn--primary" onClick={handleSubmitButton}>
            Make Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipeEdit);
