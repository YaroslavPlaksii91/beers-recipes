import React, { useEffect } from "react";
import { useBeerStore } from "../../zustand/store";

export const RecipeList: React.FC = () => {
  const { recipes, setRecipes } = useBeerStore();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers?page=1");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [setRecipes]);

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};
