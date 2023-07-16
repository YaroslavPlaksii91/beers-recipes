import { create } from "zustand";

import { BeerStoreType } from "./types";

export const useBeerStore = create<BeerStoreType>((set) => ({
  recipes: [],
  page: 1,
  setRecipes: (recipes) => set({ recipes }),
  setPage: (page) => set({ page }),
  addRecipes: (newRecipes) =>
    set((state) => ({
      recipes: [...state.recipes, ...newRecipes],
    })),
  removeRecipes: (recipeIds) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => !recipeIds.includes(recipe.id)),
    })),
}));
