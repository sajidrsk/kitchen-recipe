import React from "react";
import { Button, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export default function RecipeIngredientEdit(props) {
  const { ingredient, handleIngredientChange, handleIngredientDelete } = props;

  const handleChange = (changes) => {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
  };
  return (
    <>
      <TextField
        variant="outlined"
        className="recipe-edit__input"
        type="text"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={ingredient.name}
      />
      <TextField
        variant="outlined"
        className="recipe-edit__input"
        type="text"
        onChange={(e) => handleChange({ amount: e.target.value })}
        value={ingredient.amount}
      />

      <Button
        size="small"
        variant="contained"
        color="secondary"
        className="btn btn--danger"
        onClick={() => handleIngredientDelete(ingredient.id)}
      >
        <DeleteIcon />
      </Button>
    </>
  );
}
