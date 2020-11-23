import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css";
import RecipeEdit from "./RecipeEdit";

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
      id: Date.now().toString(),
      name: "",
      servings: 0,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: Date.now().toString(),
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
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "0:45",
    instructions:
      "1. Put the salt on chicken \n2. Put Ckicken in oven \n3. Eat the Chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Mutton Dish",
    servings: 5,
    cookTime: "1:45",
    instructions:
      "1. Put the poparika on Mutton \n2. Put Mutton in oven \n3. Eat the Mutton",
    ingredients: [
      {
        id: 1,
        name: "Mutton",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Paparika",
        amount: "1Tbs",
      },
    ],
  },
];

export default App;
