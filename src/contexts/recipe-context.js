import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { database as db } from "../firebase";
import { useAuth } from "./auth-context";

export const RecipeContext = React.createContext();

export const RecipeContextProvider = ({ children }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState([]);
  const { currentUser } = useAuth();
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    let ref = db.ref(`${currentUser?.uid}/recipes`);
    ref.on("value", (snapshot) => {
      setRecipes(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
  }, [currentUser]);

  const handleRecipeSelect = (id) => {
    setSelectedRecipeId(id);
  };

  const handleRecipeAdd = () => {
    const recipeRef = db.ref(`${currentUser?.uid}/recipes`);
    const newRecipeRef = recipeRef.push();

    const newRecipe = {
      id: newRecipeRef.path.pieces_[2],
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

    newRecipeRef.set(newRecipe);
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  };

  const handleRecipeChange = (id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
    db.ref(`${currentUser?.uid}/recipes/${id}`).set(recipe);
  };

  const handleRecipeDelete = (id) => {
    if (selectedRecipeId !== null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
    db.ref(`${currentUser?.uid}/recipes/${id}`).remove();
  };

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    selectedRecipe,
    recipes,
  };

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {children}
    </RecipeContext.Provider>
  );
};
