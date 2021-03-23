import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Recipe from "./Recipe";
import { RecipeContext } from "../contexts/recipe-context";
import { useAuth } from "../contexts/auth-context";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    // setError("")
    try {
      await logout();
      history.push("/login");
    } catch {
      // setError("Failed to log out")
    }
  };

  return (
    <>
      <Button
        size="small"
        color="Secondary"
        variant="contained"
        onClick={handleLogout}
      >
        SignOut
      </Button>
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
    </>
  );
}
