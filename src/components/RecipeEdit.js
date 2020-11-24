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
    <div className="recipe-edit" onClick={() => handleRecipeSelect(undefined)}>
      <div className="recipe-edit__modal" onClick={(e) => e.stopPropagation()}>
        <div className="recipe-edit__remove-button-container">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            // className="btn recipe-edit__remove-button"
            onClick={() => handleRecipeSelect(undefined)}
          >
            <CloseIcon fontSize="small" />
            {/* &times; */}
          </Button>
        </div>
        <div className="recipe-edit__details-grid">
          {/* <label htmlFor="name" className="recipe-edit__label">
            Name
          </label> */}
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
          {/* <label htmlFor="cookTime" className="recipe-edit__label">
            Cook Time
          </label> */}
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
          {/* <label htmlFor="servings" className="recipe-edit__label">
            Servings
          </label> */}
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
          {/* <label
            htmlFor="instructions"
            id="instructions"
            className="recipe-edit__label"
          >
            Instructions
          </label> */}
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
        {/* <label className="recipe-edit__label">Ingredients</label> */}
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
          <Button
            size="small"
            variant="contained"
            color="primary"
            // className="btn btn--primary"
            onClick={handleIngredientAdd}
          >
            Add Ingredient
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            // className="btn btn--primary"
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
