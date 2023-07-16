import { FC } from "react";
import { useBeerStore } from "../../zustand/store";

export const RecipeList: FC = () => {
  const { recipes } = useBeerStore();

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
        </li>
      ))}
    </ul>
  );
};
