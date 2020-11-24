import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      <div>
        {recipes.map((recipe) => {
          return <Recipe key={recipe.id} {...recipe} />;
        })}
      </div>
      <div className="recipe-list__add-recipe-btn-container">
        <Button
          color="primary"
          variant="contained"
          // className="btn btn--primary"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </Button>
      </div>
    </div>
  );
}
