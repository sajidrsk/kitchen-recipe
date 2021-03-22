import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IngredientList from "./IngredientList";
import { RecipeContext } from "../contexts/recipe-context";

const useStyles = makeStyles({
  buttonMargin: {
    margin: "5px",
  },
});

function Recipe(props) {
  const classes = useStyles();
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  const { id, name, cookTime, servings, instructions, ingredients } = props;
  const [showDetails, setShowDetails] = useState(false);

  const recipeDetails = (
    <div className="recipe__details" onClick={() => setShowDetails(false)}>
      <div
        className="recipe__details--modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="recipe__header">
          <h3 className="recipe__title">{name}</h3>
          <div>
            <Button
              size="small"
              className={classes.buttonMargin}
              variant="contained"
              color="primary"
              onClick={() => handleRecipeSelect(id)}
            >
              Edit
            </Button>
            <Button
              size="small"
              className={classes.buttonMargin}
              variant="contained"
              color="secondary"
              onClick={() => handleRecipeDelete(id)}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="recipe__row">
          <span className="recipe__label">Cook Time:</span>
          <span className="recipe__value">{cookTime}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Servings:</span>
          <span className="recipe__value">{servings}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Instrucions:</span>
          <div className="recipe__value recipe__instructions recipe__value--indented">
            {instructions}
          </div>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Ingredients:</span>
          <div className="recipe__value recipe__value--indented">
            <IngredientList ingredients={ingredients} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="recipe" onClick={() => setShowDetails(true)}>
        <h3 className="recipe__title">{name}</h3>
      </div>
      {showDetails ? recipeDetails : ""}
    </>
  );
}

export default Recipe;
