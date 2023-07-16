import { FC, useEffect } from "react";

import { useBeerStore } from "./zustand/store";

import { Container } from "./components/Container/Container";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { BeerRecipe } from "./components/BeerRecipe/BeerRecipe";

export const App: FC = () => {
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
    <Container>
      <h1>Beer Recipes</h1>
      <RecipeList />
      {/* {recipes.length > 0 && <BeerRecipe recipe={recipes[14]} />} */}
    </Container>
  );
};
