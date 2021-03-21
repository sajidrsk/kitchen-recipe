import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.scss";
import RecipeEdit from "./RecipeEdit";
import { v4 as uuidv4 } from "uuid";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleRecipeAdd = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 0,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  };

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  };

  const handleRecipeDelete = (id) => {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: uuidv4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "0:45",
    instructions:
      "1. Put the salt on chicken \n2. Put Ckicken in oven \n3. Eat the Chicken",
    ingredients: [
      {
        id: uuidv4(),
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: uuidv4(),
        name: "Salt",
        amount: "1Tbs",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Mutton Dish",
    servings: 5,
    cookTime: "1:45",
    instructions:
      "1. Put the poparika on Mutton \n2. Put Mutton in oven \n3. Eat the Mutton",
    ingredients: [
      {
        id: uuidv4(),
        name: "Mutton",
        amount: "2 Pounds",
      },
      {
        id: uuidv4(),
        name: "Paparika",
        amount: "1Tbs",
      },
    ],
  },
];

export default App;
