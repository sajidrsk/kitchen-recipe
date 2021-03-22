import React from "react";

import RecipeList from "../../components/RecipeList";
import RecipeEdit from "../../components/RecipeEdit";
import { RecipeContext } from "../../contexts/recipe-context";

const Home = () => {
  const { recipes, selectedRecipe } = React.useContext(RecipeContext);
  return (
    <div>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </div>
  );
};

export default Home;
