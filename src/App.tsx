import { FC, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useBeerStore } from "./zustand/store";
import { getRecipes } from "./services/getRecipes";

import { Container } from "./components/Container/Container";
import { Heading } from "./components/Heading/Heading";

const RecipeList = lazy(() => import("./components/RecipeList/RecipeList"));
const BeerRecipe = lazy(() => import("./components/BeerRecipe/BeerRecipe"));

export const App: FC = () => {
  const { recipes, setRecipes, page, setPage, addRecipes } = useBeerStore();

  useEffect(() => {
    getRecipes(page).then(setRecipes).catch(console.error);
  }, [setRecipes]);

  useEffect(() => {
    if (recipes.length < 15 && recipes.length > 0) {
      setPage(page + 1);

      getRecipes(page + 1)
        .then(addRecipes)
        .catch(console.error);
    }
  }, [recipes.length, setPage]);

  return (
    <Container>
      <Heading level={1}>Beer Recipes</Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RecipeList />} />

          <Route path="/:id" element={<BeerRecipe />}></Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Container>
  );
};
