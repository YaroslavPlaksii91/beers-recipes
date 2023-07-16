import { BeerRecipeType } from "../components/BeerRecipe/types";

export type BeerStoreType = {
  recipes: BeerRecipeType[];
  setRecipes: (recipes: BeerRecipeType[]) => void;
  addRecipes: (newRecipes: BeerRecipeType[]) => void;
  removeRecipes: (recipeIds: number[]) => void;
  page: number;
  setPage: (page: number) => void;
};
