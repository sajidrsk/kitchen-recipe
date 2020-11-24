import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      <div className="recipe-list__grid">
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </Button>
      </div>
    </div>
  );
}
