import React from "react";
import { RecipeList } from "./components/RecipeList/RecipeList";

export const App: React.FC = () => {
  return (
    <div>
      <h1>Beer Recipes</h1>
      <RecipeList />
    </div>
  );
};
