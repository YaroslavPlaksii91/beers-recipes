import { create } from "zustand";

interface BeerRecipe {
  id: number;
  name: string;
  description: string;
  // Add more properties as needed
}

interface BeerStore {
  recipes: BeerRecipe[];
  setRecipes: (recipes: BeerRecipe[]) => void;
}

export const useBeerStore = create<BeerStore>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
}));
