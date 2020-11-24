import React, { useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";

const RecipeEdit = ({ recipe }) => {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);
  const [tempChanges, setTempChages] = useState(recipe);

  const handleChange = (changes) => {
    setTempChages({ ...tempChanges, ...changes });
  };

  const handleSubmitButton = () => {
    handleRecipeChange(recipe.id, tempChanges);
    handleRecipeSelect(undefined);
  };

  const handleIngredientChange = (id, ingredient) => {
    const newIngredients = [...tempChanges.ingredients];
    const index = newIngredients.findIndex((i) => i.id === id);
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  };

  const handleIngredientAdd = () => {
    const newIngredient = {
      id: Date.now().toString(),
      name: "",
    };
    handleChange({ ingredients: [...tempChanges.ingredients, newIngredient] });
  };

  const handleIngredientDelete = (id) => {
    handleChange({
      ingredients: tempChanges.ingredients.filter((i) => i.id !== id),
    });
  };

  return (
    <div className="recipe-edit" onClick={() => handleRecipeSelect(undefined)}>
      <div className="recipe-edit__modal" onClick={(e) => e.stopPropagation()}>
        <div className="recipe-edit__remove-button-container">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleRecipeSelect(undefined)}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </div>
        <div className="recipe-edit__details-grid">
          <TextField
            variant="outlined"
            label="Recipe Name"
            type="text"
            name="name"
            id="name"
            className="recipe-edit__input"
            value={tempChanges.name}
            onChange={(e) => handleChange({ name: e.target.value })}
          />
          <TextField
            variant="outlined"
            label="CookTime"
            type="text"
            name="cookTime"
            id="cookTime"
            className="recipe-edit__input"
            value={tempChanges.cookTime}
            onChange={(e) => handleChange({ cookTime: e.target.value })}
          />
          <TextField
            variant="outlined"
            label="Servings"
            type="text"
            name="servings"
            id="servings"
            className="recipe-edit__input"
            value={tempChanges.servings}
            onChange={(e) =>
              handleChange({ servings: parseInt(e.target.value) || "" })
            }
          />
          <TextField
            variant="outlined"
            label="Instructions"
            multiline
            rows={5}
            name="instructions"
            id="instructions"
            className="recipe-edit__input"
            value={tempChanges.instructions}
            onChange={(e) => handleChange({ instructions: e.target.value })}
          />
        </div>
        <br />
        <div className="recipe-edit__ingredient-grid">
          <div>Name</div>
          <div>Amount</div>
          <div></div>
          {tempChanges.ingredients.map((ingredient) => (
            <RecipeIngredientEdit
              key={ingredient.id}
              handleIngredientChange={handleIngredientChange}
              ingredient={ingredient}
              handleIngredientDelete={handleIngredientDelete}
            />
          ))}
        </div>
        <div className="recipe-edit__add-ingredient-btn-container">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleIngredientAdd}
          >
            Add Ingredient
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSubmitButton}
          >
            Make Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipeEdit);
